/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from '@stencil/core';
import { isEmpty, isEqual } from 'lodash-es';
import { format, parseISO } from 'date-fns';

import {
  getConfiguration,
  getFilter,
  getOptions,
  validateRequiredParams,
} from '../../helpers/chart.utils';
import { ConfigurationInstance } from '../../services/configuration';
import Translations from '../../config/translations/en.json';
import {
  ALL_FONTS,
  RVConfiguration,
  RVCreditScoreSummary,
  RVFilterAll,
  RVFilterCreditScore,
  RVFormattedScoreResponse,
  RVOptions,
} from '../../types';
import { errorLog } from '../../services/logger';
import { getTitleByReportType, isCreditScore } from '../../helpers/utils';

import { getReportData } from './credit-score.utils';

@Component({
  tag: 'railz-credit-score',
  styleUrl: 'credit-score.scss',
  shadow: true,
})
export class CreditScore {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterCreditScore;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterCreditScore;
  @State() private _options: RVOptions;
  @State() private _data: RVCreditScoreSummary;
  @State() private errorStatusCode: number;
  @State() private asOfDate: string;

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options: Whitelabeling options
   * @param triggerRequest - indicate if api request should be made
   */
  private validateParams = async (
    configuration: RVConfiguration,
    filter: RVFilterCreditScore,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter as RVFilterAll) as RVFilterCreditScore;
        this._options = getOptions(options);
        if (validateRequiredParams(this._filter as RVFilterAll)) {
          if (isCreditScore(this._filter.reportType)) {
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
  async watchFilter(newValue: RVFilterCreditScore, oldValue: RVFilterCreditScore): Promise<void> {
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
      })) as RVFormattedScoreResponse;

      if (reportData?.data) {
        this.asOfDate = reportData.meta.endDate;
        this._data = reportData.data;
      } else if (reportData?.error) {
        errorLog(Translations.RV_NOT_ABLE_TO_RETRIEVE_REPORT_DATA);
        this.errorStatusCode = reportData.error?.statusCode;
      } else {
        errorLog(Translations.RV_ERROR_202_TITLE);
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

    return (
      <div class="rv-gauge-chart-container">
        <railz-gauge-chart mode={'inherit'} options={this._options} data={this._data} />
      </div>
    ) as HTMLElement;
  };

  render(): HTMLElement {
    if (this.errorStatusCode === 0) {
      return null;
    }

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
              style: { marginLeft: '5px', ...this._options?.tooltipIndicator?.style },
            }}
            tooltipText={
              this._options?.content?.tooltip?.description || Translations.RV_TOOLTIP_CREDIT_SCORE
            }
          />
        )}
      </p>
    );

    const SubTitleElement = (): HTMLElement => {
      return this.errorStatusCode ||
        isEmpty(this.asOfDate) ||
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
                  parseISO(this.asOfDate),
                  this.options?.content?.date?.format || 'dd MMM yyyy',
                )}
          </p>
        ) as HTMLElement)
      );
    };

    return (
      <div class="rv-container" style={this._options?.container?.style}>
        <div class="rv-header-container">
          {this._options?.title?.visible === false ? '' : <TitleElement />}
          {this._options?.subTitle?.position === 'top' && <SubTitleElement />}
        </div>
        {this.renderMain()}
        {this._options?.subTitle?.position !== 'top' && <SubTitleElement />}
      </div>
    );
  }
}
