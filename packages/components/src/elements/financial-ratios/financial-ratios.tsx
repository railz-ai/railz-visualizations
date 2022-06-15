/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from '@stencil/core';
import { isEmpty, isEqual } from 'lodash-es';

import { getConfiguration, getOptions, getFilter } from '../../helpers/chart.utils';
import { ConfigurationInstance } from '../../services/configuration';
import Translations from '../../config/translations/en.json';
import {
  FinancialRatio,
  RVConfiguration,
  RVFilterAll,
  RVFilterFinancialRatio,
  RVFinancialRatioItem,
  RVFinancialRatioSummary,
  RVFormattedFinancialRatioResponse,
  RVOptions,
} from '../../types';
import { errorLog } from '../../services/logger';
import { roundNumber, isFinancialRatios } from '../../helpers/utils';

import { getReportData } from './financial-ratios.utils';

@Component({
  tag: 'railz-financial-ratios',
  styleUrl: 'financial-ratios.scss',
  shadow: true,
})
export class FinancialRatios {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterFinancialRatio;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterFinancialRatio;
  @State() private _options: RVOptions;
  @State() private _summary: RVFinancialRatioSummary;
  @State() private _selected: RVFinancialRatioItem;
  @State() private error: string;
  @State() private errorStatusCode: number;

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options: Whitelabeling options
   * @param triggerRequest - indicate if api request should be made
   */
  private validateParams = async (
    configuration: RVConfiguration,
    filter: RVFilterFinancialRatio,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    console.log('validateParams configuration', configuration);
    this._configuration = getConfiguration(configuration);
    console.log('validateParams this._configuration', this._configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter as RVFilterAll) as RVFilterFinancialRatio;
        if (this._filter) {
          if (isFinancialRatios(this._filter.reportType)) {
            this._options = getOptions(options, filter as RVFilterAll);
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
        this.error = e;
        errorLog(e);
      }
    } else {
      this.errorStatusCode = 0;
      this.error = Translations.RV_CONFIGURATION_NOT_PRESENT;
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
    newValue: RVFilterFinancialRatio,
    oldValue: RVFilterFinancialRatio,
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

  private handleSelected = (selectedIndex: number): void => {
    const summaryKeys = Object.keys(this._summary);
    const selectedKey = summaryKeys[selectedIndex];
    this._selected = this._summary[selectedKey] as unknown as RVFinancialRatioItem;
  };

  /**
   * Request report data based on filter and configuration param
   */
  private requestReportData = async (): Promise<void> => {
    this.error = '';
    this.loading = Translations.RV_LOADING_REPORT;
    try {
      const reportData = (await getReportData({
        filter: this._filter as RVFilterAll,
      })) as RVFormattedFinancialRatioResponse;

      if (reportData?.data) {
        this._summary = reportData?.data as RVFinancialRatioSummary;
        if (!isEmpty(this._summary)) {
          this.handleSelected(0);
        } else {
          this.error = Translations.RV_NOT_ABLE_TO_RETRIEVE_REPORT_DATA;
          this.errorStatusCode = reportData.error?.statusCode;
        }
      } else if (reportData?.error) {
        this.error = Translations.RV_NOT_ABLE_TO_RETRIEVE_REPORT_DATA;
        this.errorStatusCode = reportData.error?.statusCode;
      } else {
        this.error = Translations.RV_ERROR_202_TITLE;
        this.errorStatusCode = reportData?.status;
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

  private renderMain = (): HTMLElement => {
    if (!isEmpty(this.error) || this.errorStatusCode !== undefined) {
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

    const FinancialRatioItem = ({ key }: { key: string }): HTMLElement => {
      const translation = (key: string, tooltip = false): string => {
        const financialRatioKey = Object.keys(FinancialRatio).find(
          (ratio: string): boolean => FinancialRatio[ratio] === key,
        );
        return (
          (tooltip
            ? Translations['RV_FINANCIAL_RATIO_TOOLTIP_' + financialRatioKey]
            : Translations['RV_FINANCIAL_RATIO_' + financialRatioKey]) || ''
        );
      };
      const item: RVFinancialRatioItem = this._selected[key];
      const tooltipText = translation(key, true);

      return (
        <div class="rv-financial-ratio-container-item">
          <div class="rv-financial-ratio-info">
            <div class="rv-ratio-name">
              {!isEmpty(tooltipText) && (
                <div class="rv-ratio-tooltip">
                  <railz-tooltip
                    tooltipText={tooltipText}
                    tooltipStyle={{ position: 'bottom-right' }}
                  />
                </div>
              )}
              <div class="rv-ratio-name-text">{translation(key)}</div>
            </div>
            <div class="rv-ratio-values">
              <div class="rv-ratio-summary">{roundNumber(item.currentValue)}</div>
              <div class="rv-ratio-percentage">
                <railz-percentage percentage={item.percentageChange} />
              </div>
            </div>
          </div>

          <div class="rv-financial-ratio-ratios">
            <div class="rv-sparkline">
              <railz-sparkline-chart data={item.timePeriodData} />
            </div>
          </div>
        </div>
      );
    };

    return (
      this._selected && (
        <div class="rv-financial-ratios">
          {Object.keys(this._selected)?.map((key: string) => (
            <FinancialRatioItem key={key} />
          ))}
        </div>
      )
    );
  };

  render(): HTMLElement {
    if (this.errorStatusCode === 0) {
      return null;
    }

    const TitleElement = (): HTMLElement => (
      <p class="rv-title" style={this._options?.title?.style}>
        {(this._options?.title && this._options?.title?.text) || ''}
      </p>
    );

    const SelectElement = (): HTMLElement => {
      const items = Object.keys(this._summary).map(
        (item) => Translations[`RV_FINANCIAL_RATIO_TYPE_${item.toUpperCase()}`],
      );

      return (
        <railz-select
          items={items}
          selectStyle={{ position: 'left' }}
          onSelectedItem={(event) => {
            this.handleSelected(event.detail);
          }}
        />
      );
    };

    return (
      <div class="rv-container" style={this._options?.container?.style}>
        <div class="rv-header-container">
          <TitleElement />
          {!isEmpty(this._summary) && <SelectElement />}
        </div>
        {this.renderMain()}
      </div>
    );
  }
}
