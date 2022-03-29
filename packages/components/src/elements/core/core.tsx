/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, Prop, h, State, Watch } from '@stencil/core';

import { isEmpty, isEqual } from 'lodash-es';

import { isGauge, isPie, isStatements, isTransactions } from '../../helpers/utils';

import { RVConfiguration, RVFilter, RVFilterDate, RVFilterFrequency, RVOptions } from '../../types';
import { getConfiguration, getFilter } from '../../helpers/chart.utils';
import { ConfigurationInstance } from '../../services/configuration';

@Component({
  tag: 'railz-visualizations',
  shadow: true,
})
export class Core {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter: RVFilter;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options: RVOptions;

  @State() private _filter: RVFilter;
  @State() private _configuration: RVConfiguration;

  @State() private errorStatusCode: number;

  private propsUpdated = (): void => {
    this.validateParams(this.configuration, this.filter);
  };

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   */
  private validateParams = (configuration: RVConfiguration, filter: RVFilter): void => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      this._filter = getFilter(filter);
      if (!this._filter) {
        this.errorStatusCode = 500;
      }
    } else {
      this.errorStatusCode = 500;
    }
  };

  @Watch('filter')
  watchFilter(newValue: RVFilter, oldValue: RVFilter): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, newValue);
    }
  }

  @Watch('configuration')
  watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(newValue, this.filter);
    }
  }

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  componentDidLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  render(): HTMLElement {
    if (!isEmpty(this.errorStatusCode)) {
      return <railz-error-image statusCode={this.errorStatusCode || 500} />;
    }

    if (isGauge(this._filter?.reportType)) {
      return (
        <railz-gauge-chart
          configuration={this.configuration}
          filter={this.filter as RVFilterDate}
          options={this.options}
        />
      );
    }

    if (isPie(this._filter?.reportType)) {
      return (
        <railz-pie-chart
          configuration={this.configuration}
          filter={this.filter as RVFilterDate}
          options={this.options}
        />
      );
    }
    if (isStatements(this._filter?.reportType)) {
      return (
        <railz-statements-chart
          configuration={this.configuration}
          filter={this.filter as RVFilterFrequency}
          options={this.options}
        />
      );
    }
    if (isTransactions(this._filter?.reportType)) {
      return (
        <railz-transactions-control
          configuration={this.configuration}
          filter={this.filter as RVFilterDate}
          options={this.options}
        />
      );
    }
    return <span />;
  }
}
