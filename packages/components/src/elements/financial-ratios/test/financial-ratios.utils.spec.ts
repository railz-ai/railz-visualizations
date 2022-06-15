/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';

import { Core } from '../core';

describe('railz-visualizations', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [Core],
      html: `<railz-visualizations></railz-visualizations>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-visualizations>
        <mock:shadow-root></mock:shadow-root>
      </railz-visualizations>
    `);
  });

  it('renders simple data', async () => {
    const page = await newSpecPage({
      components: [Core],
      html: `<railz-visualizations
      configuration="{
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "debug": true
    }"
      filter="{
        "startDate": "2021-05-01",
        "endDate": "2022-05-31",
        "reportFrequency": "month",
        "businessName": "TestBusinessAutomationPlaidQBO",
        "serviceName": "quickbooks",
        "reportType": "balanceSheets"
    }">
    </railz-visualizations>`,
    });
    expect(page.root)
      .toEqualHtml(`<railz-visualizations \"2021-05-01\",=\"\" \"2022-05-31\",=\"\" \"balancesheets\"=\"\" \"businessname\":=\"\" \"debug\":=\"\" \"enddate\":=\"\" \"eyjhbgcioijiuzi1niis...\",=\"\" \"month\",=\"\" \"quickbooks\",=\"\" \"reportfrequency\":=\"\" \"reporttype\":=\"\" \"servicename\":=\"\" \"testbusinessautomationplaidqbo\",=\"\" configuration=\"{
        \" filter=\"{
        \" startdate\":=\"\" token\":=\"\" true=\"\" }\"=\"\">
  <mock:shadow-root></mock:shadow-root>
</railz-visualizations>`);
  });
});

// yarn test packages/components/src/elements/core/test/core.spec.tsx
