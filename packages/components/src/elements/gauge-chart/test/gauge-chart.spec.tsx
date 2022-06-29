import { newSpecPage } from '@stencil/core/testing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { GaugeChart } from '../gauge-chart';
import { RVReportFrequency, RVReportTypes } from '../../../types';
import { RVAllProviders } from '../../../types/enum/service-providers';
import * as GaugeChartUtils from '../gauge-chart.utils';

import GaugeChartData from './gaugeChartData.json';

describe('railz-gauge-chart', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [GaugeChart],
      html: `<railz-gauge-chart></railz-gauge-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-gauge-chart>
        <mock:shadow-root></mock:shadow-root>
      </railz-gauge-chart>
    `);
  });

  it('renders without data', async () => {
    const page = await newSpecPage({
      components: [GaugeChart],
      template: () => (
        <railz-gauge-chart
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            reportFrequency: RVReportFrequency.MONTH,
            businessName: 'QboFrdTest',
            serviceName: RVAllProviders.QUICKBOOKS,
            reportType: RVReportTypes.RAILZ_SCORE,
          }}
          options={{
            container: {
              tooltip: false,
            },
          }}
        ></railz-gauge-chart>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-gauge-chart>
      <mock:shadow-root>
        <div class="rv-container">
          <div class="rv-header-container">
            <p class="rv-title">
              Railz Score
            </p>
          </div>
          <railz-error-image statuscode="404"></railz-error-image>
          <div></div>
        </div>
      </mock:shadow-root>
    </railz-gauge-chart>
    `);
  });

  it('renders with data', async () => {
    jest
      .spyOn(GaugeChartUtils, 'getReportData')
      .mockImplementation(() => Promise.resolve(GaugeChartData));

    const page = await newSpecPage({
      components: [GaugeChart],
      template: () => (
        <railz-gauge-chart
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            reportFrequency: RVReportFrequency.MONTH,
            businessName: 'QboFrdTest',
            serviceName: RVAllProviders.QUICKBOOKS,
            reportType: RVReportTypes.RAILZ_SCORE,
          }}
          options={{
            container: {
              tooltip: false,
            },
          }}
        ></railz-gauge-chart>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-gauge-chart>
      <mock:shadow-root>
        <div class="rv-container">
          <div class="rv-header-container">
            <p class="rv-title">
              Railz Score
            </p>
          </div>
          <div style="max-height: 50%;">
            <railz-gauge-chart-component></railz-gauge-chart-component>
          </div>
          <div></div>
        </div>
      </mock:shadow-root>
    </railz-gauge-chart>
    `);
  });
});

// yarn test packages/components/src/elements/gauge-chart/test/gauge-chart.spec.tsx
