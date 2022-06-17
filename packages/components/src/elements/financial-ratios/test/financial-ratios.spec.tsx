/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';

import { FinancialRatios } from '../financial-ratios';
import { RVReportFrequency, RVReportTypes } from '../../../types';
import { RVAllProviders } from '../../../types/enum/service-providers';
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
            businessName: 'QboFrdTest',
            serviceName: RVAllProviders.QUICKBOOKS,
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
      .mockImplementation(() => Promise.resolve(FinancialRatioData));

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
            businessName: 'QboFrdTest',
            serviceName: RVAllProviders.QUICKBOOKS,
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
                <div class="rv-ratio-tooltip"></div>
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
            <div class="rv-financial-ratio-ratios">
              <div class="rv-sparkline">
                <railz-sparkline-chart></railz-sparkline-chart>
              </div>
            </div>
          </div>
          <div class="rv-financial-ratio-container-item">
            <div class="rv-financial-ratio-info">
              <div class="rv-ratio-name">
                <div class="rv-ratio-tooltip"></div>
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
            <div class="rv-financial-ratio-ratios">
              <div class="rv-sparkline">
                <railz-sparkline-chart></railz-sparkline-chart>
              </div>
            </div>
          </div>
          <div class="rv-financial-ratio-container-item">
            <div class="rv-financial-ratio-info">
              <div class="rv-ratio-name">
                <div class="rv-ratio-tooltip"></div>
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
            <div class="rv-financial-ratio-ratios">
              <div class="rv-sparkline">
                <railz-sparkline-chart></railz-sparkline-chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mock:shadow-root>
  </railz-financial-ratios>
    `);
  });
});

// yarn test packages/components/src/elements/financial-ratios/test/financial-ratios.spec.tsx