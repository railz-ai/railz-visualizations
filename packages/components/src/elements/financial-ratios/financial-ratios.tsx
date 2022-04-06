/* eslint-disable @stencil/own-methods-must-be-private */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from '@stencil/core';
import { isEmpty, isEqual } from 'lodash-es';

import {
  getConfiguration,
  getDateFilter,
  validateRequiredParams,
  getOptions,
} from '../../helpers/chart.utils';
import { ConfigurationInstance } from '../../services/configuration';
import Translations from '../../config/translations/en.json';
import {
  RVConfiguration,
  RVFilterDate,
  RVFinancialRatioItem,
  RVFinancialRatioSummary,
  RVFormattedFinancialRatioResponse,
  RVOptions,
} from '../../types';
import { errorLog } from '../../services/logger';

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
  @Prop() readonly filter!: RVFilterDate;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterDate;
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
    filter: RVFilterDate,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getDateFilter(filter) as RVFilterDate;
        this._options = getOptions(options, filter);
        const valid = validateRequiredParams(filter);
        if (valid) {
          if (triggerRequest) {
            await this.requestReportData();
          }
        } else {
          this.errorStatusCode = 204;
          this.error = Translations.ERROR_204_TITLE;
        }
      } catch (e) {
        this.errorStatusCode = 500;
        this.error = e;
        errorLog(e);
      }
    } else {
      this.errorStatusCode = 500;
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
  async watchFilter(newValue: RVFilterDate, oldValue: RVFilterDate): Promise<void> {
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
   */
  private requestReportData = async (): Promise<void> => {
    this.error = '';
    this.loading = Translations.LOADING_REPORT;
    try {
      const reportData = (await getReportData({
        filter: this._filter,
      })) as RVFormattedFinancialRatioResponse;

      if (reportData?.data) {
        this._summary = reportData?.data as RVFinancialRatioSummary;
        this._selected = this._summary[
          Object.keys(this._summary)[0]
        ] as unknown as RVFinancialRatioItem;
      } else if (reportData?.error) {
        this.error = Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA;
        this.errorStatusCode = reportData.error?.statusCode;
      } else {
        this.error = Translations.ERROR_202_TITLE;
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

  private handleSelect(event) {
    this._selected = this._summary[event.target.value] as unknown as RVFinancialRatioItem;
  }

  private renderMain = (): HTMLElement => {
    if (!isEmpty(this.error)) {
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
      this._selected && (
        <div>
          {Object.keys(this._selected)?.map((key: string) => (
            <div class="railz-financial-ratio-container">
              <div class="railz-financial-ratio-info">{key}</div>
              <div class="railz-financial-ratio-ratios">{key}</div>
            </div>
          ))}
        </div>
      )
    );
  };

  render(): HTMLElement {
    const TitleElement = () => (
      <p class="railz-title" style={this._options?.title?.style}>
        {(this._options?.title && this._options?.title?.text) || ''}
      </p>
    );

    const SelectElement = () => (
      <select onInput={(event) => this.handleSelect(event)}>
        {!isEmpty(this._summary) &&
          Object.keys(this._summary)?.map((key: string) => <option value={key}>{key}</option>)}
      </select>
    );

    return (
      <div class="railz-container" style={this._options?.container?.style}>
        <div class="railz-title-grid">
          <TitleElement />
          <SelectElement />
        </div>
        {this.renderMain()}
      </div>
    );
  }
}
