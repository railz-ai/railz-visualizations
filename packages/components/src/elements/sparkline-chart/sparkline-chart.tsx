/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, Watch, State } from '@stencil/core';
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';

import { RVOptionsRatioSparkLineStyle, RVPeriodData } from '../../types';

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

  @Prop() readonly sparkLineStyle?: RVOptionsRatioSparkLineStyle;

  @State() private containerRef?: HTMLDivElement;

  @Watch('containerRef')
  watchContainerRef(newValue: HTMLDivElement, _: HTMLDivElement): void {
    const options = getOptions(
      this.data.map((periodValue) => periodValue.value),
      this.sparkLineStyle?.chart,
    );
    if (newValue && options) {
      Highcharts.chart(this.containerRef, options);
    }
  }

  render(): HTMLElement {
    return (
      <div
        class="rv-sparkline-chart-container"
        style={this.sparkLineStyle?.container}
        id="railz-chart"
        ref={(el): HTMLDivElement => (this.containerRef = el)}
      />
    );
  }
}
