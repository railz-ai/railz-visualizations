/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from "@stencil/core";
import { isEmpty, isEqual } from "lodash-es";

import { isStatements, isTransactions } from "../../helpers/utils";
import {
  RVConfiguration,
  RVFilter,
  RVFilterDate,
  RVFilterFrequency,
  RVOptions,
  RVContent,
} from "../../types";
import { getConfiguration, getFilter } from "../../helpers/chart.utils";
@Component({
  tag: "railz-visualizations",
  styleUrl: "./core.scss",
  shadow: true,
})
export class Core {
  @Prop() readonly configuration: RVConfiguration;
  @Prop() readonly filter: RVFilter;
  @Prop() readonly options: RVOptions;
  @Prop() readonly content: RVContent;

  @State() private _filter: RVFilter;
  @State() private _configuration: RVConfiguration;

  @State() private error: string;
  @State() private errorStatusCode: number;

  private propsUpdated = (): void => {
    this.validateParams(this.configuration, this.filter);
  };

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   */
  private validateParams = (
    configuration: RVConfiguration,
    filter: RVFilter
  ): void => {
    try {
      this._configuration = getConfiguration(configuration);
      if (this._configuration) {
        this._filter = getFilter(filter);
      }
    } catch (error) {
      this.error = error.message;
    }
  };

  @Watch("configuration")
  validateConfiguration(
    newValue: RVConfiguration,
    oldValue: RVConfiguration
  ): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(newValue, this.filter);
    }
  }

  @Watch("filter")
  validateFilter(newValue: RVFilter, oldValue: RVFilter): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, newValue);
    }
  }

  @Watch("options")
  validateOptions(newValue: RVOptions, oldValue: RVOptions): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, this.filter);
    }
  }

  @Watch("content")
  validateContent(newValue: RVContent, oldValue: RVContent): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, this.filter);
    }
  }

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  componentDidLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  render(): HTMLElement {
    if (!isEmpty(this.error) || !isEmpty(this.errorStatusCode)) {
      return (
        <railz-error-image
          message={this.error}
          statusCode={this.errorStatusCode || 500}
        />
      );
    }

    if (isStatements(this._filter?.reportType)) {
      return (
        <railz-statements-chart
          configuration={this.configuration}
          filter={this.filter as RVFilterFrequency}
          content={this.content}
          options={this.options}
        />
      );
    }
    if (isTransactions(this._filter?.reportType)) {
      return (
        <railz-transactions-control
          configuration={this.configuration}
          filter={this.filter as RVFilterDate}
          content={this.content}
          options={this.options}
        />
      );
    }
    return <span />;
  }
}
