/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { FinancialRatios } from '../financial-ratios';
import { RVReportFrequency, RVReportTypes } from '../../../types';
import * as FinancialRatiosUtils from '../financial-ratios.utils';

import FinancialRatioData from './financialRatioData.json';

describe('railz-financial-ratios', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [FinancialRatios],
      html: `<railz-financial-ratios></railz-financial-ratios>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-financial-ratios>
        <mock:shadow-root></mock:shadow-root>
      </railz-financial-ratios>
    `);
  });

  it('renders without data', async () => {
    const page = await newSpecPage({
      components: [FinancialRatios],
      template: () => (
        <railz-financial-ratios
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            reportFrequency: RVReportFrequency.MONTH,
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.FINANCIAL_RATIO,
          }}
        ></railz-financial-ratios>
      ),
    });
    expect(page.root).toEqualHtml(`
      <railz-financial-ratios>
         <mock:shadow-root>
           <div class="rv-container">
             <div class="rv-header-container">
               <p class="rv-title">
                 Financial Ratios
               </p>
             </div>
             <railz-error-image statuscode="404"></railz-error-image>
           </div>
         </mock:shadow-root>
      </railz-financial-ratios>
    `);
  });

  it('renders with data', async () => {
    jest
      .spyOn(FinancialRatiosUtils, 'getReportData')
      .mockImplementation(() => Promise.resolve(FinancialRatioData['data1']));

    const page = await newSpecPage({
      components: [FinancialRatios],
      template: () => (
        <railz-financial-ratios
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            reportFrequency: RVReportFrequency.MONTH,
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.FINANCIAL_RATIO,
          }}
        ></railz-financial-ratios>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-financial-ratios>
    <mock:shadow-root>
      <div class="rv-container">
        <div class="rv-header-container">
          <p class="rv-title">
            Financial Ratios
          </p>
          <railz-select></railz-select>
        </div>
        <div class="rv-financial-ratios">
          <div class="rv-financial-ratio-container-item">
            <div class="rv-financial-ratio-info">
              <div class="rv-ratio-name">
                <railz-tooltip tooltiptext="Distance to default determines the level of default risk. This key ratio compares the business' net worth to its volatility."></railz-tooltip>
                <div class="rv-ratio-name-text">
                  Distance To Default
                </div>
              </div>
              <div class="rv-ratio-values">
                <div class="rv-ratio-summary">
                  -1.22
                </div>
                <div class="rv-ratio-percentage">
                  <railz-percentage percentage="-0.01"></railz-percentage>
                </div>
              </div>
            </div>
            <railz-sparkline-chart></railz-sparkline-chart>
          </div>
          <div class="rv-financial-ratio-container-item">
            <div class="rv-financial-ratio-info">
              <div class="rv-ratio-name">
                <railz-tooltip tooltiptext="Probability of default (PD) is the likelihood that a business will fail to pay back a debt over a specified period, usually one year. It can be applied to a variety of different risk management or credit analysis scenarios."></railz-tooltip>

                <div class="rv-ratio-name-text">
                  Probability Of Default
                </div>
              </div>
              <div class="rv-ratio-values">
                <div class="rv-ratio-summary">
                  0.89
                </div>
                <div class="rv-ratio-percentage">
                  <railz-percentage percentage="0.14"></railz-percentage>
                </div>
              </div>
            </div>
                <railz-sparkline-chart></railz-sparkline-chart>
          </div>
          <div class="rv-financial-ratio-container-item">
            <div class="rv-financial-ratio-info">
              <div class="rv-ratio-name">
                <railz-tooltip tooltiptext="Average collection period is the amount of time it takes for a business to receive payments owed by its customers in terms of accounts receivable (AR). Businesses use the average collection period to make sure they have enough cash on hand to meet their financial obligations."></railz-tooltip>

                <div class="rv-ratio-name-text">
                  Average Collection Period
                </div>
              </div>
              <div class="rv-ratio-values">
                <div class="rv-ratio-summary">
                  30
                </div>
                <div class="rv-ratio-percentage">
                  <railz-percentage percentage="0"></railz-percentage>
                </div>
              </div>
            </div>
                <railz-sparkline-chart></railz-sparkline-chart>
          </div>
        </div>
      </div>
    </mock:shadow-root>
  </railz-financial-ratios>
    `);
  });
  it('renders with data without key mapped', async () => {
    jest
      .spyOn(FinancialRatiosUtils, 'getReportData')
      .mockImplementation(() => Promise.resolve(FinancialRatioData['data2']));

    const page = await newSpecPage({
      components: [FinancialRatios],
      template: () => (
        <railz-financial-ratios
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            reportFrequency: RVReportFrequency.MONTH,
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.FINANCIAL_RATIO,
          }}
        ></railz-financial-ratios>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-financial-ratios>
    <mock:shadow-root>
      <div class="rv-container">
        <div class="rv-header-container">
          <p class="rv-title">
            Financial Ratios
          </p>
          <railz-select></railz-select>
        </div>
        <div class="rv-financial-ratios">
          <div class="rv-financial-ratio-container-item">
            <div class="rv-financial-ratio-info">
              <div class="rv-ratio-name">
                <div class="rv-ratio-name-text">
                  Churn Rate
                </div>
              </div>
              <div class="rv-ratio-values">
                <div class="rv-ratio-summary">
                  38.41
                </div>
                <div class="rv-ratio-percentage">
                  <railz-percentage percentage="10"></railz-percentage>
                </div>
              </div>
            </div>
            <railz-sparkline-chart></railz-sparkline-chart>
          </div>
        </div>
      </div>
    </mock:shadow-root>
  </railz-financial-ratios>
    `);
  });
});

// yarn test packages/components/src/elements/financial-ratios/test/financial-ratios.spec.tsx
