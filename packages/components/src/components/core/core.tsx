import {Component, h, Prop, State, Watch} from '@stencil/core';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import indicators from 'highcharts/indicators/indicators';
import trendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import {isStatements, isTransactions} from '../../helpers/utils';

import {RVConfiguration, RVFilter, RVFilterDate, RVFilterFrequency, RVOptions} from '../../types';
import {getConfiguration, getFilter} from "../../helpers/chart.utils";

exporting(Highcharts);
indicators(Highcharts);
trendline(Highcharts);
highchartsAccessibility(Highcharts);

@Component({
  tag: 'railz-visualizations',
  styleUrl: './core.scss',
  shadow: true,
})
export class Core {
  @Prop() configuration!: RVConfiguration;
  @Prop() filter!: RVFilter;
  @Prop() options: RVOptions;

  @State()
  private _filter: RVFilter;
  @State()
  private _configuration: RVConfiguration;

  @State()
  private errorStatusCode: number;

  propsUpdated = () => {
    this.validateParams(this.configuration, this.filter);
  };

  /**
  * Validates if configuration was passed correctly before setting filter
  * @param configuration - Config for authentication
  * @param filter - filter to decide chart type to show
  */
  validateParams = (configuration: RVConfiguration, filter: RVFilter) => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      this._filter = getFilter(filter);
    }
  };

  @Watch('filter')
  validateFilter(newValue: RVFilter, _: RVFilter) {
    console.log(newValue);
    console.log('newValue Core Filters');
    this.validateParams(this.configuration, newValue);
  }

  @Watch('configuration')
  validateConfiguration(newValue: RVConfiguration, _: RVConfiguration) {
    console.log(newValue);
    console.log('newValue Core');
    this.validateParams(newValue, this.filter);
  }

  componentWillLoad() {
    this.propsUpdated && this.propsUpdated();
  }

  componentDidLoad() {
    this.propsUpdated && this.propsUpdated();
  }

  render() {
    if (this.errorStatusCode) {
      return <railz-error-image statusCode={this.errorStatusCode || 500}/>;
    }

    if (isStatements(this._filter?.reportType)) {
      return <railz-statements-chart configuration={this.configuration} filter={this.filter as RVFilterFrequency}
                                     options={this.options}/>;
    }
    if (isTransactions(this._filter?.reportType)) {
      return (
        <railz-transactions-control
          configuration={this.configuration} filter={this.filter as RVFilterDate} options={this.options}
        />
      );
    }
    return '';
  }
}
