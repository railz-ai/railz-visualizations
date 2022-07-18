/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, Prop, Watch, State, h, setMode } from '@stencil/core';

import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more.js';
import solidGauge from 'highcharts/modules/solid-gauge.js';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import { isEqual } from 'lodash-es';

import { RVCreditScoreSummary, RVOptions } from '../../types';
import { getData, getOptions } from '../../helpers/chart.utils';

import { getOptionsGauge } from './gauge-chart.utils';

setMode((elm) => {
  return (elm as any).mode || elm.getAttribute('mode') || 'default';
});
highchartsMore(Highcharts);
solidGauge(Highcharts);
highchartsAccessibility(Highcharts);
@Component({
  tag: 'railz-gauge-chart',
  styleUrls: {
    default: 'gauge-chart.default.scss',
    inherit: 'gauge-chart.inherit.scss',
  },
  shadow: true,
})
export class RailzGaugeChart {
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options: RVOptions;
  @Prop() readonly data: RVCreditScoreSummary;
  @State() private containerRef?: HTMLDivElement;
  @State() private _options: RVOptions;
  @State() private _data: RVCreditScoreSummary;

  @Watch('containerRef')
  watchContainerRef(newValue: HTMLDivElement): void {
    const options = getOptionsGauge(this._data, this._options);
    if (newValue && options) {
      Highcharts.chart(this.containerRef, options);
    }
  }

  @Watch('options')
  async watchOptions(newValue: RVOptions, oldValue: RVOptions): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this._options = getOptions(this.options);
    }
  }

  @Watch('data')
  async watchData(newValue: RVOptions, oldValue: RVOptions): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this._data = getData(this.data);
    }
  }

  private propsUpdated = async (): Promise<void> => {
    this._options = getOptions(this.options);
    this._data = getData(this.data);
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  render(): HTMLElement {
    console.log('this._options in gauge-chart', this._options);
    return (
      this.data && (
        <div
          class="rv-score-chart-container"
          id="railz-creditScore-chart"
          ref={(el): HTMLDivElement => (this.containerRef = el)}
          style={{
            width: this._options?.chart?.width,
            height: this._options?.chart?.height,
          }}
        />
      )
    );
  }
}
