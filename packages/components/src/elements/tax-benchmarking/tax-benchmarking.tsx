/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, Prop, h, State, Watch } from '@stencil/core';

import { isNil, isEqual, isEmpty } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import {
  RVConfiguration,
  RVFilterAll,
  RVFilterTaxBenchmarking,
  RVOptions,
  RVTaxBenchmarkingReponse,
} from '../../types';
import {
  getConfiguration,
  getFilter,
  getOptions,
  validateIndustryCodeAndRegionParams,
} from '../../helpers/chart.utils';
import { getTitleByReportType, handleError, isTaxBenchmarking } from '../../helpers/utils';

import { ConfigurationInstance } from '../../services/configuration';

import { errorLog } from '../../services/logger';

import { formatDate, getPercentageChange, getReportData } from './tax-benchmarking.utils';

const renderPercentageChange = (percentage: number, options: RVOptions): HTMLElement => {
  if (percentage < 0) {
    return (
      <div class="rv-negative" style={options?.chart?.pie?.negative}>
        &#x25BC; {Math.abs(percentage)}%
      </div>
    );
  } else {
    return (
      <div class="rv-positive" style={options?.chart?.pie?.positive}>
        {isNil(percentage) || isNaN(percentage) || Math.abs(percentage) === Infinity ? (
          '-'
        ) : (
          <div>&#x25B2; {Math.abs(percentage)}%</div>
        )}
      </div>
    );
  }
};

@Component({
  tag: 'railz-tax-benchmarking',
  styleUrl: './tax-benchmarking.scss',
  shadow: true,
})
export class TaxBenchmarking {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterTaxBenchmarking;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options?: RVOptions;

  @State() private _options: RVOptions;
  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterTaxBenchmarking;
  @State() private _data: RVTaxBenchmarkingReponse;
  @State() private _taxBenchmarkingData: RVTaxBenchmarkingReponse['taxBenchmarkingData'];
  @State() private _businessValuesData: RVTaxBenchmarkingReponse['businessValues'];
  @State() private errorStatusCode: number;

  @State() private selectedLineItem: string;
  @State() private selectedCategory: string;
  @State() private lineItemOptions: string[];
  @State() private categoryOptions: string[];
  @State() private tableData;

  private updateTaxBenchmarkingParams = (): void => {
    this.selectedLineItem = this._taxBenchmarkingData && Object.keys(this._taxBenchmarkingData)[0];
    this.selectedCategory =
      this._taxBenchmarkingData && Object.keys(this._taxBenchmarkingData[this.selectedLineItem])[0];
    // set initial options and selected values
    this.lineItemOptions = Object.keys(this._taxBenchmarkingData);
    this.setCategoryOptions();
  };

  private setCategoryOptions = (): void => {
    this.categoryOptions = Object.keys(this._taxBenchmarkingData[this.selectedLineItem]);
    this.selectedCategory = this.categoryOptions[0];
    this.refreshTableData();
  };

  private setSelectedLineItem = (event): void => {
    this.selectedLineItem = event?.target?.value;
    this.setCategoryOptions();
  };
  private setSelectedCategory = (event): void => {
    this.selectedCategory = event?.target?.value;
    this.refreshTableData();
  };

  private refreshTableData = (): void => {
    if (this.selectedLineItem !== null && this.selectedCategory !== null) {
      const businessValueItem = this._businessValuesData[this.selectedLineItem];
      // set the keys and values for the table data as a row object
      // [['Assets', 1234.56], ['Equity', 2134.67].....]
      const tempDataArray = Object.entries(
        this._taxBenchmarkingData[this.selectedLineItem][this.selectedCategory],
      );
      const dataResp = tempDataArray.map((data) => {
        return {
          lineItemName: data[0],
          businessValue: businessValueItem[data[0]],
          benchmarkValue: data[1],
          differencePercent: getPercentageChange(businessValueItem[data[0]], data[1] as number),
        };
      });
      this.tableData = dataResp;
    }
  };

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options: Whitelabeling options
   * @param triggerRequest - indicate if api request should be made
   */
  private validateParams = async (
    configuration: RVConfiguration,
    filter: RVFilterTaxBenchmarking,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter as RVFilterAll) as RVFilterTaxBenchmarking;
        this._options = getOptions(options);
        if (validateIndustryCodeAndRegionParams(this._filter as RVFilterAll)) {
          if (isTaxBenchmarking(this._filter.reportType)) {
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

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter, this.options);
    }
  }

  @Watch('filter')
  async watchFilter(
    newValue: RVFilterTaxBenchmarking,
    oldValue: RVFilterTaxBenchmarking,
  ): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(this.configuration, newValue, this.options);
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
   */
  private requestReportData = async (): Promise<void> => {
    this.errorStatusCode = undefined;
    this.loading = Translations.RV_LOADING_REPORT;
    try {
      const reportData = (await getReportData({
        filter: this._filter as RVFilterAll,
      })) as RVTaxBenchmarkingReponse;
      if (!isNil(reportData?.taxBenchmarkingData) && !isNil(reportData?.businessValues)) {
        this._data = reportData;
        this._taxBenchmarkingData = reportData?.taxBenchmarkingData;
        this._businessValuesData = reportData?.businessValues;
        this.updateTaxBenchmarkingParams();
      } else {
        this.errorStatusCode = handleError(reportData);
      }
    } catch (error) {
      errorLog(Translations.RV_NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    } finally {
      this.loading = '';
    }
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  render(): HTMLElement {
    const TitleElement = (): HTMLElement => (
      <p class="rv-title" style={this._options?.title?.style}>
        {this._options?.content?.title || getTitleByReportType(this._filter?.reportType) || ''}{' '}
        {/* {this._options?.tooltipIndicator?.visible === false ? (
          ''
        ) : (
          <railz-tooltip
            tooltipStyle={{
              position: 'bottom-center',
              ...this._options?.tooltipIndicator,
              style: { marginLeft: '6px', ...this._options?.tooltipIndicator?.style },
            }}
            tooltipText={
              this._options?.content?.tooltip?.description ||
              Translations.RV_TOOLTIP_TAX_BENCHMARKING
            }
          />
        )} */}
      </p>
    );

    const renderMain = (): HTMLElement => {
      if (
        isEmpty(this.loading) &&
        this.errorStatusCode === undefined &&
        isEmpty(this._data?.taxBenchmarkingData) &&
        isEmpty(this._data?.businessValues)
      ) {
        // if it's not loading and all are empty, show no data error
        this.errorStatusCode = 204;
      }

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
        <div class="rv-tax-benchmarking-container">
          <div class="rv-tax-benchmarking-group">
            <div class="rv-tax-benchmarking-business-info">
              <div>
                Current Business:{' '}
                <span style={{ color: '#111111' }}>
                  {isEmpty(this.loading) && this._data?.meta?.businessName}
                </span>
              </div>
              <div>As of {isEmpty(this.loading) && formatDate(this._data?.meta?.endDate)}</div>
            </div>
            <table class="benchmarking-table" id="benchmarking-table">
              <tr>
                <th>
                  <div class="table-header">
                    Line Item {'-'}
                    <select onChange={this.setSelectedLineItem}>
                      {this.lineItemOptions.map((lineItem) => (
                        <option selected={this.selectedLineItem === lineItem} value={lineItem}>
                          {lineItem}
                        </option>
                      ))}
                    </select>
                  </div>
                </th>
                <th>
                  <div class="header-with-tooltip table-header">
                    Business Value{' '}
                    <railz-tooltip
                      tooltipStyle={{
                        position: 'bottom-center',
                        ...this._options?.tooltipIndicator,
                        style: { marginLeft: '6px', ...this._options?.tooltipIndicator?.style },
                      }}
                      tooltipText={
                        this._options?.content?.tooltip?.description ||
                        Translations.RV_TOOLTIP_TAX_BENCHMARKING_BUSINESS_VALUE
                      }
                    />
                  </div>
                </th>
                <th>
                  <div class="header-with-tooltip table-header">
                    Benchmark Value{' '}
                    <railz-tooltip
                      tooltipStyle={{
                        position: 'bottom-center',
                        ...this._options?.tooltipIndicator,
                        style: { marginLeft: '6px', ...this._options?.tooltipIndicator?.style },
                      }}
                      tooltipText={
                        this._options?.content?.tooltip?.description ||
                        Translations.RV_TOOLTIP_TAX_BENCHMARKING_BENCHMARK_VALUE
                      }
                    />
                  </div>
                </th>
                <th>
                  <div class="table-header">
                    <select onChange={this.setSelectedCategory}>
                      {this.categoryOptions.map((category) => (
                        <option selected={this.selectedCategory === category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </th>
              </tr>
              {this.tableData.map((row) => (
                <tr>
                  <td>{row.lineItemName}</td>
                  <td>{row.businessValue || '-'}</td>
                  <td>{row.benchmarkValue}</td>
                  <td>
                    <div class="rv-chart-percentage">
                      {renderPercentageChange(row.differencePercent, {})}
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      );
    };

    return (
      <div class="rv-container" style={this._options?.container?.style}>
        <div class="rv-header-container">
          {this._options?.title?.visible === false ? '' : <TitleElement />}
        </div>
        {renderMain()}
      </div>
    );
  }
}
