/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { FinancialRatios } from '../financial-ratios';
import { RVReportFrequency, RVReportTypes } from '../../../types';
import { RVAllProviders } from '../../../types/enum/service-providers';
import * as FinancialRatiosUtils from '../financial-ratios.utils';

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

  it('renders simple data', async () => {
    const page = await newSpecPage({
      components: [FinancialRatios],
      template: () => (
        <railz-financial-ratios
          configuration={{
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMCwiY3VzdG9tZXJTZWNyZXRJZGVudGlmaWVyIjoiSURfUUEyX0ZCNDgyQzFFQjZDQjQ3NzBCRDdGNjU2RTNFOTYwRjYwIiwic2FuZGJveCI6ZmFsc2UsIm5hbWUiOiJhY2Nlc3MiLCJiZXRhIjp0cnVlLCJpYXQiOjE2NTUzMTgxMDgsImV4cCI6MTY1NTMyMTcwOCwiYXVkIjoiYXBpIn0.QoiX6X-WmMfvu_azJnBLkS9OpXQ6r2NGdEZFEwRyOn0',
            debug: true,
            endpoint: 'https://api.qa2.railz.ai',
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

  it('renders without props', async () => {
    const mockResponse = {
      uuid: '123',
      kind: 'auth',
      url: 'https://asd.com',
      secret: '123',
    };
    const baseUrl = `localhost:8080/webhooks`;
    const server = setupServer(
      rest.get(baseUrl, (_req, res, ctx) => res(ctx.json([mockResponse]))),
      rest.put(`localhost:8080/webhooks/123`, (_req, res, ctx) => res(ctx.json(mockResponse))),
      rest.post(`localhost:8080/webhooks`, (_req, res, ctx) => res(ctx.json(mockResponse))),
      rest.delete(`localhost:8080/webhooks/123`, (_req, res, _ctx) =>
        res.networkError('Connection error'),
      ),
    );
    server.listen();

    jest.spyOn(FinancialRatiosUtils, 'getReportData').mockImplementation(() => Promise.resolve({}));

    const page = await newSpecPage({
      components: [FinancialRatios],
      template: () => (
        <railz-financial-ratios
          configuration={{
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMCwiY3VzdG9tZXJTZWNyZXRJZGVudGlmaWVyIjoiSURfUUEyX0ZCNDgyQzFFQjZDQjQ3NzBCRDdGNjU2RTNFOTYwRjYwIiwic2FuZGJveCI6ZmFsc2UsIm5hbWUiOiJhY2Nlc3MiLCJiZXRhIjp0cnVlLCJpYXQiOjE2NTUzMTgxMDgsImV4cCI6MTY1NTMyMTcwOCwiYXVkIjoiYXBpIn0.QoiX6X-WmMfvu_azJnBLkS9OpXQ6r2NGdEZFEwRyOn0',
            debug: true,
            endpoint: 'https://api.qa2.railz.ai',
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

    server.resetHandlers();
  });
});

// yarn test packages/components/src/elements/financial-ratios/test/financial-ratios.spec.tsx
