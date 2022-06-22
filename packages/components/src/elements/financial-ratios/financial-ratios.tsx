/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from '@stencil/core';
import { isEmpty, isEqual } from 'lodash-es';

import {
  getConfiguration,
  getOptions,
  getFilter,
  validateRequiredParams,
} from '../../helpers/chart.utils';
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
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter as RVFilterAll) as RVFilterFinancialRatio;
        this._options = getOptions(options, filter as RVFilterAll);
        if (validateRequiredParams(this._filter as RVFilterAll)) {
          if (isFinancialRatios(this._filter.reportType)) {
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
          this.errorStatusCode = reportData.error?.statusCode;
        }
      } else if (reportData?.error) {
        this.errorStatusCode = reportData.error?.statusCode;
      } else {
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

    const FinancialRatioItem = ({ key }: { key: string }): HTMLElement => {
      const translation = (key: string, tooltip = false): string => {
        const financialRatioKey = Object.keys(FinancialRatio).find(
          (ratio: string): boolean => FinancialRatio[ratio] === key,
        );
        const financialRatio = FinancialRatio[financialRatioKey];
        const contentTranslation = this._options?.content?.label?.[financialRatio];
        const contentTooltipTranslation = this._options?.content?.tooltip?.[financialRatio];

        if (tooltip) {
          if (contentTooltipTranslation) return contentTooltipTranslation;
          return Translations['RV_FINANCIAL_RATIO_TOOLTIP_' + financialRatioKey];
        }
        if (contentTranslation) return contentTranslation;
        return Translations['RV_FINANCIAL_RATIO_' + financialRatioKey] || '';
      };
      const item: RVFinancialRatioItem = this._selected[key];
      const tooltipText = translation(key, true);

      return (
        <div class="rv-financial-ratio-container-item" style={this._options?.ratio?.itemContainer}>
          <div class="rv-financial-ratio-info" style={this._options?.ratio?.itemInfo}>
            <div class="rv-ratio-name" style={this._options?.ratio?.itemName}>
              {!isEmpty(tooltipText) && (
                <div class="rv-ratio-tooltip" style={this._options?.ratio?.itemToolTip}>
                  {this._options?.container?.tooltip ? (
                    <railz-tooltip
                      tooltipText={tooltipText}
                      tooltipStyle={{ position: 'bottom-right' }}
                    />
                  ) : null}
                </div>
              )}
              <div class="rv-ratio-name-text" style={this._options?.ratio?.itemNameText}>
                {translation(key)}
              </div>
            </div>
            <div class="rv-ratio-values" style={this._options?.ratio?.itemValues}>
              <div class="rv-ratio-summary" style={this._options?.ratio?.itemSummary}>
                {roundNumber(item.currentValue)}
              </div>
              <div class="rv-ratio-percentage">
                <railz-percentage
                  percentage={item.percentageChange}
                  percentageStyle={this._options?.ratio?.itemPercentage}
                />
              </div>
            </div>
          </div>

          <div class="rv-financial-ratio-ratios" style={this._options?.ratio?.ratios}>
            <div class="rv-sparkline" style={this._options?.ratio?.ratioSparkLine}>
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
        {this._options?.title?.text || ''}{' '}
        {this._options?.container?.tooltip || this._options?.content?.tooltip?.description ? (
          <div
            style={{
              marginTop: '1px ',
              marginLeft: '3px ',
            }}
          >
            <railz-tooltip
              tooltipStyle={{ position: 'bottom-center' }}
              tooltipText={this._options?.content?.tooltip?.description}
            />
          </div>
        ) : null}
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
        <div class="rv-header-container" style={this._options?.ratio?.header}>
          <TitleElement />
          {!isEmpty(this._summary) && <SelectElement />}
        </div>
        {this.renderMain()}
      </div>
    );
  }
}
