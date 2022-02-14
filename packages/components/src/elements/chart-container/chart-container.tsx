import {h, Component, Element, Host, Prop} from '@stencil/core';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import indicators from 'highcharts/indicators/indicators';
import trendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';

exporting(Highcharts);
indicators(Highcharts);
trendline(Highcharts);
highchartsAccessibility(Highcharts);
@Component({
  tag: 'railz-chart-container',
  styleUrl: './chart-container.scss',
  shadow: true,
})
export class ChartContainer {
  @Element() host: HTMLElement;
  @Prop() options: any;

  chart: Highcharts.Chart; // only if you need a reference to the chart for later

  componentWillLoad() {
    this.chart = Highcharts.chart(this.host, this.options);
  }

  render() {
    return (
      <Host/>
    );
  }

}
