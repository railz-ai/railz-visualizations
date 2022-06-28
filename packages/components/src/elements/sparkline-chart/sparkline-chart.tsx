/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, Watch, State } from '@stencil/core';
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';

import { RVPeriodData } from '../../types';

import { getOptions } from './sparkline-charts.utils';

highchartsAccessibility(Highcharts);

@Component({
  tag: 'railz-sparkline-chart',
  styleUrl: './sparkline-chart.scss',
  shadow: true,
})
export class SparklineChart {
  /**
   * Data to display for sparkline
   */
  @Prop() readonly data!: Array<RVPeriodData>;

  @Prop() readonly sparkLineStyle?: { [key: string]: any };

  @State() private containerRef?: HTMLDivElement;

  @Watch('containerRef')
  watchContainerRef(newValue: HTMLDivElement, _: HTMLDivElement): void {
    const options = getOptions(this.data.map((periodValue) => periodValue.value));
    if (newValue && options) {
      Highcharts.chart(this.containerRef, options);
    }
  }

  render(): HTMLElement {
    return (
      <div
        class="railz-sparkline-chart-container"
        style={this.sparkLineStyle}
        id="railz-chart"
        ref={(el): HTMLDivElement => (this.containerRef = el)}
      />
    );
  }
}
