/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, Prop, h, State, Watch } from '@stencil/core';

import { isNil, isEqual, isEmpty } from 'lodash-es';
import { format, parseISO } from 'date-fns';

import Translations from '../../config/translations/en.json';
import {
  ALL_FONTS,
  RVBusinessValuations,
  RVConfiguration,
  RVFilterAll,
  RVFilterBusinessValuations,
  RVOptions,
} from '../../types';
import {
  getConfiguration,
  getFilter,
  getOptions,
  validateRequiredParams,
} from '../../helpers/chart.utils';
import {
  formatCurrencyValue,
  getTitleByReportType,
  isBusinessValuations,
} from '../../helpers/utils';

import { ConfigurationInstance } from '../../services/configuration';

import { errorLog } from '../../services/logger';

import { getBusinessValuationsParams, getReportData } from './business-valuations.utils';

@Component({
  tag: 'railz-business-valuations',
  styleUrl: './business-valuations.scss',
  shadow: true,
})
export class BusinessValuations {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterBusinessValuations;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options?: RVOptions;

  @State() private _options: RVOptions;
  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterBusinessValuations;
  @State() private errorStatusCode: number;

  @State() private liquidationValue: number;
  @State() private discountedCashflowValue: number;
  @State() private multipleToRevenueValue: number;
  @State() private firstChicagoValue: number;

  @State() private liquidationPercentageChange: number;
  @State() private discountedCashflowPercentageChange: number;
  @State() private multipleToRevenuePercentageChange: number;
  @State() private firstChicagoPercentageChange: number;
  @State() private latestEndDate: string;

  private updateBusinessValuationsParams = (summary: RVBusinessValuations): void => {
    const params = getBusinessValuationsParams(summary);
    if (params) {
      this.loading = '';
      this.liquidationValue = params.liquidation;
      this.discountedCashflowValue = params.discountedCashflow;
      this.multipleToRevenueValue = params.multipleToRevenue;
      this.firstChicagoValue = params.firstChicago;
      this.liquidationPercentageChange = params.liquidationPercentageChange;
      this.discountedCashflowPercentageChange = params.discountedCashflowPercentageChange;
      this.multipleToRevenuePercentageChange = params.multipleToRevenuePercentageChange;
      this.firstChicagoPercentageChange = params.firstChicagoPercentageChange;
      this.latestEndDate = params.latestEndDate;
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
    filter: RVFilterBusinessValuations,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter as RVFilterAll) as RVFilterBusinessValuations;
        this._options = getOptions(options);
        if (validateRequiredParams(this._filter as RVFilterAll)) {
          if (isBusinessValuations(this._filter.reportType)) {
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
    newValue: RVFilterBusinessValuations,
    oldValue: RVFilterBusinessValuations,
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
      })) as RVBusinessValuations;
      if (reportData?.reports) {
        this.updateBusinessValuationsParams(reportData);
      } else {
        errorLog(Translations.RV_ERROR_204_TITLE);
        this.errorStatusCode = 204;
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
        {this._options?.tooltipIndicator?.visible === false ? (
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
              Translations.RV_TOOLTIP_BUSINESS_VALUATION
            }
          />
        )}
      </p>
    );

    const SubTitleElement = (): HTMLElement => {
      return isEmpty(this.latestEndDate) ||
        this.errorStatusCode !== undefined ||
        this._options?.subTitle?.visible === false ? (
        <span></span>
      ) : (
        ((
          <p
            class="rv-score-last-updated"
            style={{
              fontFamily: this._options?.chart?.fontFamily || ALL_FONTS,
              ...this._options?.subTitle?.style,
            }}
          >
            {this._options?.content?.subTitle || Translations.RV_AS_OF}{' '}
            {this._options?.subTitle?.dateVisible === false
              ? ''
              : format(
                  parseISO(this.latestEndDate),
                  this.options?.content?.date?.format || 'MMM dd yyyy',
                )}
          </p>
        ) as HTMLElement)
      );
    };

    const renderMain = (): HTMLElement => {
      if (this.errorStatusCode !== undefined) {
        return (
          <railz-error-image
            statusCode={this.errorStatusCode || 500}
            {...this._options?.errorIndicator}
          />
        );
      }

      if (
        isNil(this.liquidationValue) ||
        isNil(this.discountedCashflowValue) ||
        isNil(this.multipleToRevenueValue) ||
        isNil(this.firstChicagoValue)
      ) {
        return <span></span>;
      }

      if (!isEmpty(this.loading)) {
        return <railz-loading loadingText={this.loading} {...this._options?.loadingIndicator} />;
      }

      return (
        <div class="rv-valuation-container">
          <div class="rv-valuation-group">
            {ValuationSection(
              Translations.RV_BUSINESS_VALUATIONS_LIQUIDATION_VALUE,
              this.liquidationValue,
              this.liquidationPercentageChange,
            )}
            {ValuationSection(
              Translations.RV_BUSINESS_VALUATIONS_DISCOUNTED_CASH_FLOW,
              this.discountedCashflowValue,
              this.discountedCashflowPercentageChange,
            )}
          </div>
          <div class="rv-valuation-group">
            {ValuationSection(
              Translations.RV_BUSINESS_VALUATIONS_MULTIPLE_TO_REVENUE,
              this.multipleToRevenueValue,
              this.multipleToRevenuePercentageChange,
            )}
            {ValuationSection(
              Translations.RV_BUSINESS_VALUATIONS_FIRST_CHICAGO,
              this.firstChicagoValue,
              this.firstChicagoPercentageChange,
            )}
          </div>
        </div>
      );
    };

    const renderPercentageChange = (percentage): HTMLElement => {
      if (percentage < 0) {
        return (
          <div class="rv-negative" style={this._options?.chart?.pie?.negative}>
            &#x25BC; {Math.abs(percentage)}%
          </div>
        );
      } else {
        return (
          <div class="rv-positive" style={this._options?.chart?.pie?.positive}>
            &#x25B2;{' '}
            {isNil(percentage) || isNaN(percentage) || Math.abs(percentage) === Infinity
              ? 0
              : Math.abs(percentage)}
            %
          </div>
        );
      }
    };

    const ValuationSection = (title, value, percentage): HTMLElement => (
      <div class="rv-valuation-section">
        <p class="rv-valuation-title">{title}</p>
        <div class="rv-valuation-value-row">
          <p class="rv-valuation-value">{formatCurrencyValue(Math.round(value), 0)}</p>
          <div class="rv-income-statements-chart-percentage">
            {isNil(percentage) || isNaN(percentage) || Math.abs(percentage) === Infinity
              ? null
              : renderPercentageChange(percentage)}
          </div>
        </div>
      </div>
    );

    return (
      <div class="rv-container" style={this._options?.container?.style}>
        <div class="rv-header-container">
          {this._options?.title?.visible === false ? '' : <TitleElement />}
          {/* <SubTitleElement /> */}
        </div>
        {renderMain()}
      </div>
    );
  }
}
