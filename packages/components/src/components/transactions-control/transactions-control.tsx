/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from "@stencil/core";

import { isEmpty, isEqual } from "lodash-es";

import Translations from "../../config/translations/en.json";
import { errorLog } from "../../services/logger";

import {
  RVBillInvoiceSummary,
  RVConfiguration,
  RVFilterDate,
  RVFormattedTransactionResponse,
  RVOptions,
  RVContent,
  RVFilter,
} from "../../types";
import {
  getConfiguration,
  getDateFilter,
  getOptions,
  getContent,
} from "../../helpers/chart.utils";

import { getTransactionsData } from "./transactions-control.utils";

@Component({
  tag: "railz-transactions-control",
  styleUrl: "./transactions-control.scss",
  shadow: true,
})
export class TransactionsControl {
  @Prop() readonly configuration!: RVConfiguration;
  @Prop() readonly filter!: RVFilterDate;
  @Prop() readonly options: RVOptions;
  @Prop() readonly content: RVContent;

  @State() private loading = "";
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterDate;
  @State() private _options: RVOptions;
  @State() private _content: RVContent;
  @State() private _dataFormatted: RVBillInvoiceSummary;
  @State() private error: string;
  @State() private errorStatusCode: number;

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options - various options that can change display
   * @param content - content to text that should display
   * @param triggerRequest - indicate if api request should be made
   */
  private validateParams = async (
    configuration: RVConfiguration,
    filter: RVFilter,
    options: RVOptions,
    content: RVContent,
    triggerRequest = true
  ): Promise<void> => {
    try {
      this._configuration = getConfiguration(configuration);
    } catch (error) {
      this.error = error.message;
    }
    if (this._configuration) {
      try {
        this._filter = getDateFilter(filter as RVFilterDate) as RVFilterDate;
        this._options = getOptions(options);
        this._content = getContent(content, this._filter);
        if (triggerRequest) {
          await this.requestReportData();
        }
      } catch (error) {
        this.error = error.message;
      }
    }
  };

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

  private requestReportData = async (): Promise<void> => {
    this.error = "";
    this.loading = Translations.LOADING_REPORT;
    const reportData = (await getTransactionsData({
      filter: this._filter,
      configuration: this._configuration,
    })) as RVFormattedTransactionResponse;
    try {
      if (reportData?.data) {
        this._dataFormatted = reportData?.data;
      } else if (reportData?.error) {
        this.error = Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA;
        this.errorStatusCode = reportData.error?.statusCode;
      } else {
        this.error = Translations.ERROR_202_TITLE;
        this.errorStatusCode = reportData?.status;
      }
    } catch (error) {
      errorLog(Translations.NOT_ABLE_TO_PARSE_REPORT_DATA, error);
      this.error =
        Translations.NOT_ABLE_TO_PARSE_REPORT_DATA + " " + error.message;
    } finally {
      this.loading = "";
    }
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated(false);
  }

  componentDidLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private renderMain(): HTMLElement {
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
    if (!isEmpty(this._dataFormatted)) {
      return (
        <railz-progress-bar
          reportType={this._filter?.reportType}
          unpaidAmount={this._dataFormatted.unpaidAmount}
          paidAmount={this._dataFormatted.paidAmount}
          overdueAmount={this._dataFormatted.overdueAmount}
        />
      );
    }
  }

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
