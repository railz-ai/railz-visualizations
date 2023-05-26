/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';

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
});
