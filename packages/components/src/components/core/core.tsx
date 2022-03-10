/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, Prop, h, State, Watch } from '@stencil/core';
import { isEqual } from 'lodash-es';

import { isStatements, isTransactions } from '../../helpers/utils';
import {
  RVConfiguration,
  RVFilter,
  RVFilterDate,
  RVFilterFrequency,
  RVOptions,
  RVContent,
} from '../../types';
import { getConfiguration, getFilter, getOptions, getContent } from '../../helpers/chart.utils';
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
  @Prop() readonly options?: RVOptions;
  /**
   * Content text/info
   */
  @Prop() readonly content?: RVContent;

  @State() private _filter: RVFilter;
  @State() private _configuration: RVConfiguration;
  @State() private _options: RVOptions;
  @State() private _content: RVContent;

  @State() private errorStatusCode = 0;

  private propsUpdated = (): void => {
    this.validateParams(this.configuration, this.filter, this.options, this.content);
  };

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options: Whitelabeling options
   * @param content - content to text that should display
   */
  private validateParams = (
    configuration: RVConfiguration,
    filter: RVFilter,
    options: RVOptions,
    content: RVContent,
  ): void => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      this._filter = getFilter(filter);
      this._options = getOptions(options, filter);
      this._content = getContent(content);
      if (!this._filter) {
        this.errorStatusCode = 500;
      }
    } else {
      this.errorStatusCode = 500;
    }
  };

  @Watch('configuration')
  watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(newValue, this.filter, this.options, this.content);
    }
  }

  @Watch('filter')
  watchFilter(newValue: RVFilterFrequency, oldValue: RVFilterFrequency): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, newValue, this.options, this.content);
    }
  }

  @Watch('options')
  watchOptions(newValue: RVOptions, oldValue: RVOptions): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, this.filter, newValue, this.content);
    }
  }

  @Watch('content')
  watchContent(newValue: RVContent, oldValue: RVContent): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, this.filter, this.options, newValue);
    }
  }

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  componentDidLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  render(): HTMLElement {
    if (this.errorStatusCode !== 0) {
      return <railz-error-image statusCode={this.errorStatusCode || 500} />;
    }

    if (isStatements(this._filter?.reportType)) {
      return (
        <railz-statements-chart
          configuration={this.configuration}
          filter={this.filter as RVFilterFrequency}
          options={this._options}
          content={this._content}
        />
      );
    }
    if (isTransactions(this._filter?.reportType)) {
      return (
        <railz-transactions-control
          configuration={this.configuration}
          filter={this.filter as RVFilterDate}
          options={this._options}
          content={this._content}
        />
      );
    }
    return <span />;
  }
}
