/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { RVReportFrequency, RVReportTypes } from '../../../types';

import * as BusinessValuationsUtils from '../business-valuations.utils';

import { BusinessValuations } from '../business-valuations';

describe('railz-business-valuations', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [BusinessValuations],
      html: `<railz-business-valuations></railz-business-valuations>`,
    });
    expect(page.root).toEqualHtml(`
	  <railz-business-valuations>
		<mock:shadow-root>
			<div class="rv-container">
		    <div class="rv-header-container">
          <p class="rv-title">
		        <railz-tooltip tooltiptext="Business Valuations are created for the monthly timeframe and are used to determine the estimated worth or financial value of your business. The percent change measures the valuation difference from the previous month."></railz-tooltip>
		      </p>
		    </div>
		    <railz-error-image statuscode="500"></railz-error-image>
		  </div>
		</mock:shadow-root>
	  </railz-business-valuations>
	`);
  });

  it('renders with service not supported', async () => {
    jest.spyOn(BusinessValuationsUtils, 'getReportData').mockImplementation((): any =>
      Promise.resolve({
        error: {
          message: ['Service provider not supported'],
          statusCode: 404,
        },
      }),
    );

    const page = await newSpecPage({
      components: [BusinessValuations],
      template: () => (
        <railz-business-valuations
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.BUSINESS_VALUATIONS,
            reportFrequency: RVReportFrequency.MONTH,
          }}
        ></railz-business-valuations>
      ),
    });
    expect(page.root).toEqualHtml(`
      <railz-business-valuations>
	  <mock:shadow-root>
	  <div class="rv-container">
		<div class="rv-header-container">
		  <p class="rv-title">
			Business Valuations
			<railz-tooltip tooltiptext="Business Valuations are created for the monthly timeframe and are used to determine the estimated worth or financial value of your business. The percent change measures the valuation difference from the previous month."></railz-tooltip>
		  </p>
		</div>
		<railz-error-image statuscode="404"></railz-error-image>
	  </div>
	</mock:shadow-root>
      </railz-business-valuations>
    `);
  });
});
