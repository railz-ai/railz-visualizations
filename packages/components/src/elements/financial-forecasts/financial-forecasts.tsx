/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from '@stencil/core';
import Highcharts from 'highcharts';
import indicators from 'highcharts/indicators/indicators';
import trendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import { isEmpty, isEqual } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { errorLog } from '../../services/logger';
import {
  RVConfiguration,
  RVErrorResponse,
  RVFilterAll,
  RVFilterFinancialForecasts,
  RVFilterStatements,
  RVFormattedStatementData,
  RVFormattedStatementResponse,
  RVOptions,
} from '../../types';
import { RVFinancialStatementsTypes, RVReportTypes } from '../../types/enum/report-type';
import {
  getConfiguration,
  getFilter,
  getHighchartsParams,
  getOptions,
  validateRequiredParams,
} from '../../helpers/chart.utils';
import { ConfigurationInstance } from '../../services/configuration';
import { getTitleByReportType } from '../../helpers/utils';

import {
  combineHistoricalAndForecastedData,
  formatData,
  getReportData,
} from './financial-forecasts.utils';

indicators(Highcharts);
trendline(Highcharts);
highchartsAccessibility(Highcharts);

@Component({
  tag: 'railz-financial-forecasts',
  styleUrl: 'financial-forecasts.scss',
  shadow: true,
})
export class FinancialForecasts {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterStatements;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options?: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterStatements;
  @State() private _options: RVOptions;
  @State() private _dataFormattedHistorical: RVFormattedStatementData;
  @State() private _dataFormattedForecasted: RVFormattedStatementData;
  @State() private _dataFormatted: RVFormattedStatementData;
  @State() private errorStatusCode: number;

  @State() private chartOptions: any;

  @State() private containerRef?: HTMLDivElement;

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options: Whitelabeling options
   * @param content - content to text that should display
   * @param triggerRequest - indicate if api request should be made
   */
  private validateParams = async (
    configuration: RVConfiguration,
    filter: RVFilterStatements,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter as RVFilterAll) as RVFilterStatements;
        this._options = getOptions(options);
        if (validateRequiredParams(this._filter as RVFilterAll)) {
          if (
            this._filter.reportType &&
            this._filter.reportType === RVReportTypes.FINANCIAL_FORECASTS
          ) {
            if (triggerRequest) {
              await this.requestReportData();
            }
          } else {
            this.errorStatusCode = 500;
            errorLog(Translations.RV_ERROR_INVALID_REPORT_TYPE);
          }
        } else {
          this.errorStatusCode = 204;
        }
      } catch (e) {
        this.errorStatusCode = 500;
        errorLog(e);
      }
    } else {
      this.errorStatusCode = 0;
    }
  };

  @Watch('containerRef')
  watchContainerRef(newValue: HTMLDivElement, _: HTMLDivElement): void {
    if (newValue && this.chartOptions) {
      Highcharts.chart(this.containerRef, this.chartOptions);
    }
  }

  @Watch('filter')
  async watchFilter(newValue: RVFilterStatements, oldValue: RVFilterStatements): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(this.configuration, newValue, this.options);
    }
  }

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter, this.options);
    }
  }

  @Watch('options')
  async watchOptions(newValue: RVOptions, oldValue: RVOptions): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(this.configuration, this.filter, newValue);
    }
  }

  private propsUpdated = async (triggerRequest = true): Promise<void> => {
    await this.validateParams(this.configuration, this.filter, this.options, triggerRequest);
  };

  /**
   * Request report data based on filter and configuration param
   * Formats retrieved data into Highcharts format using formatData
   * Updated Highchart params using updateHighchartsParams
   */
  private requestReportData = async (): Promise<void> => {
    this.errorStatusCode = undefined;
    this.loading = Translations.RV_LOADING_REPORT;
    try {
      // const reportData = SampleBalanceSheetData;
      const reportData = (await getReportData({
        filter: this._filter as RVFilterAll,
      })) as {
        error?: RVErrorResponse;
        status?: number;
        reportDataHistorical: RVFormattedStatementResponse;
        reportDataForecasted: RVFormattedStatementResponse;
      };
      // get historical and forecasted data separately
      // combine the data for both
      // add the null data point between both
      if (reportData?.reportDataHistorical?.data || reportData?.reportDataForecasted?.data) {
        if (reportData?.reportDataHistorical?.data) {
          this._dataFormattedHistorical = formatData({
            summary: reportData.reportDataHistorical.data,
            reportType: (this._filter as RVFilterFinancialForecasts)
              ?.financialStatementType as RVFinancialStatementsTypes,
            reportFrequency: this._filter?.reportFrequency,
            chart: this._options?.chart,
            date: this._options?.content?.date,
          });
        }
        if (reportData?.reportDataForecasted?.data) {
          this._dataFormattedForecasted = formatData({
            summary: reportData.reportDataForecasted.data,
            reportType: (this._filter as RVFilterFinancialForecasts)
              ?.financialStatementType as RVFinancialStatementsTypes,
            reportFrequency: this._filter?.reportFrequency,
            chart: this._options?.chart,
            date: this._options?.content?.date,
          });
        }

        this._dataFormatted = combineHistoricalAndForecastedData(
          this._dataFormattedHistorical,
          this._dataFormattedForecasted,
        );
        this.updateHighchartsParams();
      } else if (
        reportData?.reportDataHistorical?.error ||
        reportData?.reportDataForecasted?.error
      ) {
        this.errorStatusCode =
          reportData?.reportDataHistorical?.error?.statusCode ||
          reportData?.reportDataForecasted?.error?.statusCode;
      } else if (
        reportData?.reportDataHistorical?.status == 204 ||
        reportData?.reportDataForecasted?.status == 204
      ) {
        this.errorStatusCode = 204;
      } else {
        this.errorStatusCode = reportData?.status;
      }
    } catch (error) {
      errorLog(Translations.RV_NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    } finally {
      this.loading = '';
    }
  };

  /**
   * Using getHighchartsParams,Combine generic stacked bar line
   * chart options and formatted data based on the report type
   * into one option for highcharts
   */
  private updateHighchartsParams = (): void => {
    const options = getHighchartsParams({
      dataFormatted: this._dataFormatted,
      options: this._options,
    });

    if (options) {
      if (this._dataFormatted.xPlotLineValue !== undefined) {
        options.xAxis = {
          ...options.xAxis,

          plotLines: [
            {
              color: '#757575', // Color of the line
              width: 1, // Width of the line
              value: this._dataFormatted.xPlotLineValue - 0.5, // X-axis value where the line should be drawn
              dashStyle: 'Solid', // Optional: 'Solid', 'Dot', 'Dash'
            },
          ],
        };
      }

      this.loading = '';
      this.chartOptions = options;
    }
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private renderMain = (): HTMLElement => {
    if (this.errorStatusCode !== undefined) {
      return (
        <railz-error-image
          statusCode={this.errorStatusCode || 500}
          {...this._options?.errorIndicator}
        />
      );
    }
    if (!isEmpty(this.loading)) {
      return <railz-loading loadingText={this.loading} {...this._options?.loadingIndicator} />;
    }
    return (
      <div
        class="rv-statement-chart-container"
        id="railz-chart"
        ref={(el): HTMLDivElement => (this.containerRef = el)}
        style={{ width: this._options?.chart?.width, height: this._options?.chart?.height }}
      />
    );
  };

  render(): HTMLElement {
    if (this.errorStatusCode === 0) {
      return null;
    }

    const TitleElement = (): HTMLElement => (
      <p class="rv-title" style={this._options?.title?.style}>
        {this._options?.content?.title || getTitleByReportType(this._filter?.reportType) || ''}{' '}
        {this._options?.tooltipIndicator?.visible &&
        this._options?.content?.tooltip?.description ? (
          <railz-tooltip
            tooltipStyle={{
              position: 'bottom-center',
              ...this._options?.tooltipIndicator,
              style: { marginLeft: '5px', ...this._options?.tooltipIndicator?.style },
            }}
            tooltipText={this._options?.content?.tooltip?.description}
          />
        ) : null}
      </p>
    );

    return (
      <div class="rv-container" style={this._options?.container?.style}>
        {this._options?.title?.visible === false ? (
          ''
        ) : (
          <div class="rv-header-wrapper">
            <div class="rv-header-container">
              <p class="rv-title" style={this._options?.title?.style}>
                {Translations.RV_HISTORICAL_DATA_LABEL}{' '}
                {this._options?.tooltipIndicator?.visible ? (
                  <railz-tooltip
                    tooltipStyle={{
                      position: 'bottom-center',
                      ...this._options?.tooltipIndicator,
                      style: { marginLeft: '5px', ...this._options?.tooltipIndicator?.style },
                    }}
                    tooltipText={Translations.RV_HISTORICAL_DATA_TOOLTIP}
                  />
                ) : null}
              </p>
            </div>
            <div class="rv-header-container">
              <p class="rv-title" style={this._options?.title?.style}>
                {Translations.RV_FORECASTED_DATA_LABEL}{' '}
                {this._options?.tooltipIndicator?.visible ? (
                  <railz-tooltip
                    tooltipStyle={{
                      ...this._options?.tooltipIndicator,
                      position: 'top-left',
                      arrow: 'right',
                      style: { marginLeft: '5px', ...this._options?.tooltipIndicator?.style },
                    }}
                    tooltipText={Translations.RV_FORECASTED_DATA_TOOLTIP}
                  />
                ) : null}
              </p>
            </div>
          </div>
        )}
        {this.renderMain()}
      </div>
    );
  }
}
