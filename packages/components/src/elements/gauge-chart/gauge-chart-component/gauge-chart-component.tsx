/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, Watch, State } from '@stencil/core';
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';

import { RVGaugeChartSummary, RVOptions } from '../../../types';
import { getOptionsGauge } from '../gauge-chart.utils';

highchartsAccessibility(Highcharts);

@Component({
  tag: 'railz-gauge-chart-component',
  styleUrl: './gauge-chart-component.scss',
  shadow: true,
})
export class GaugeChartComponent {
  /**
   * Data to display for gauge chart
   */
  @Prop() readonly data!: RVGaugeChartSummary;
  /**
   * Options for gauge chart
   */
  @Prop() readonly options!: RVOptions;

  @State() private containerRef?: HTMLDivElement;

  @Watch('containerRef')
  watchContainerRef(newValue: HTMLDivElement, _: HTMLDivElement): void {
    const options = getOptionsGauge(this.data, this.options);
    if (newValue && options) {
      Highcharts.chart(this.containerRef, options);
    }
  }

  render(): HTMLElement {
    return (
      <div
        class="railz-gauge-chart-container"
        id="railz-gauge-chart"
        ref={(el): HTMLDivElement => (this.containerRef = el)}
        style={{ width: this.options?.chart?.width, height: this.options?.chart?.height }}
      />
    );
  }
}
