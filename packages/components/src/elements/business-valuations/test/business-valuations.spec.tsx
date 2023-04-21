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
		  <railz-error-image statuscode="500"></railz-error-image>
		</mock:shadow-root>
	  </railz-business-valuations>
	`);
  });
});
