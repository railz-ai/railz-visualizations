/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from "@stencil/core";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import indicators from "highcharts/indicators/indicators";
import trendline from "highcharts/indicators/trendline";
import highchartsAccessibility from "highcharts/modules/accessibility";

import { isEmpty, isEqual } from "lodash-es";

import Translations from "../../config/translations/en.json";
import { errorLog } from "../../services/logger";

import {
  RVConfiguration,
  RVFilterFrequency,
  RVFormattedStatementData,
  RVFormattedStatementResponse,
  RVOptions,
  RVContent,
  RVFilter,
  RVDateFilters,
  RVAllFilter,
} from "../../types";

import { RVFinancialStatementsTypes } from "../../types/enum/report-type";
import {
  getConfiguration,
  getContent,
  getDateFilter,
  getHighchartsParams,
  getOptions,
} from "../../helpers/chart.utils";

import { formatData, getReportData } from "./statements-chart.utils";

exporting(Highcharts);
indicators(Highcharts);
trendline(Highcharts);
highchartsAccessibility(Highcharts);

@Component({
  tag: "railz-statements-chart",
  styleUrl: "./statements-chart.scss",
  shadow: true,
})
export class StatementsChart {
  @Prop() readonly configuration!: RVConfiguration;
  @Prop() readonly filter!: RVFilterFrequency;
  @Prop() readonly options: RVOptions;
  @Prop() readonly content: RVContent;

  @State() private loading = "";
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterFrequency;
  @State() private _content: RVContent;
  @State() private _options: RVOptions;
  @State() private _dataFormatted: RVFormattedStatementData;
  @State() private error: string;
  @State() private errorStatusCode: number;

  @State() private chartOptions: any;

  @State() private containerRef?: HTMLDivElement;

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options - various options that can change display
   * @param content - content to text that should display
   */
  private validateParams = async (
    configuration: RVConfiguration,
    filter: RVFilter,
    options: RVOptions,
    content: RVContent,
    triggerRequest = true
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      try {
        this._filter = getDateFilter(
          filter as RVDateFilters
        ) as RVFilterFrequency;
        this._options = getOptions(options);
        this._content = getContent(content, filter as RVAllFilter);
        if (triggerRequest) {
          await this.requestReportData();
        }
      } catch (error) {
        this.error = error.message;
      }
    }
  };

  @Watch("containerRef")
  validateContainerRef(newValue: HTMLDivElement, _: HTMLDivElement): void {
    if (newValue && this.chartOptions) {
      Highcharts.chart(this.containerRef, this.chartOptions);
    }
  }

  @Watch("configuration")
  validateConfiguration(
    newValue: RVConfiguration,
    oldValue: RVConfiguration
  ): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(newValue, this.filter, this.options, this.content);
    }
  }

  @Watch("filter")
  validateFilter(newValue: RVFilter, oldValue: RVFilter): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(
        this.configuration,
        newValue,
        this.options,
        this.content
      );
    }
  }

  @Watch("options")
  validateOptions(newValue: RVOptions, oldValue: RVOptions): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(
        this.configuration,
        this.filter,
        newValue,
        this.content
      );
    }
  }

  @Watch("content")
  validateContent(newValue: RVContent, oldValue: RVContent): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(
        this.configuration,
        this.filter,
        this.options,
        newValue
      );
    }
  }

  private propsUpdated = async (triggerRequest = true): Promise<void> => {
    await this.validateParams(
      this.configuration,
      this.filter,
      this.options,
      this.content,
      triggerRequest
    );
  };

  /**
   * Request report data based on filter and configuration
   * formats retrieved data into Highcharts format
   */
  private requestReportData = async (): Promise<void> => {
    this.error = "";
    this.loading = Translations.LOADING_REPORT;
    try {
      const reportData = (await getReportData({
        filter: this._filter,
        configuration: this._configuration,
      })) as RVFormattedStatementResponse;
      try {
        if (reportData?.data) {
          this._dataFormatted = formatData({
            summary: reportData.data,
            reportType: this._filter.reportType as RVFinancialStatementsTypes,
            reportFrequency: this._filter?.reportFrequency,
            colors: this._options?.chart?.colors,
            quarter: this._content?.date?.quarter,
            month: this._content?.date?.month,
          });
          this.updateHighchartsParams();
        } else if (reportData?.error) {
          this.error = Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA;
          this.errorStatusCode = reportData.error?.statusCode;
        } else {
          this.error = Translations.ERROR_202_TITLE;
          this.errorStatusCode = reportData?.status;
        }
      } catch (error) {
        errorLog(Translations.NOT_ABLE_TO_PARSE_REPORT_DATA, error);
        this.error = Translations.NOT_ABLE_TO_PARSE_REPORT_DATA;
      } finally {
        this.loading = "";
      }
    } catch (error) {
      this.error = error.message;
    }
  };

  private updateHighchartsParams = (): void => {
    const options = getHighchartsParams({
      dataFormatted: this._dataFormatted,
      options: this._options,
    });
    if (options) {
      this.error = "";
      this.loading = "";
      this.chartOptions = options;
    }
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated(false);
  }

  componentDidLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private renderMain = (): HTMLElement => {
    if (!isEmpty(this.error)) {
      return (
        <railz-error-image
          message={this.error}
          statusCode={this.errorStatusCode || 500}
        />
      );
    }
    if (!isEmpty(this.loading)) {
      return <railz-loading loadingText={this.loading} />;
    }
    return (
      <div
        class="railz-statement-chart-container"
        id="railz-chart"
        ref={(el): HTMLDivElement => (this.containerRef = el)}
      />
    );
  };

  render(): HTMLElement {
    return (
      <div class="railz-container" style={this._options?.container?.style}>
        {this._content?.title ? (
          <p class="railz-title" style={this._options?.title?.style}>
            {this._content?.title || ""}
          </p>
        ) : null}
        {this.renderMain()}
      </div>
    );
  }
}
