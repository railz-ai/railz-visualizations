import { newSpecPage } from '@stencil/core/testing';

import { StatementsChart } from '../statements-chart';
// TODO: add success path tests
describe('statements-chart', () => {
  describe('Fail to render due to wrong parameters', () => {
    it('renders error without parameter', async () => {
      const page = await newSpecPage({
        components: [StatementsChart],
        html: `<railz-statements-chart></railz-statements-chart>`,
      });
      expect(page.root).toEqualHtml(`
      <railz-statements-chart>
        <mock:shadow-root>
            <div class="railz-container">
              <railz-error-image statuscode="500"></railz-error-image>
            </div>
        </mock:shadow-root>
      </railz-statements-chart>
    `);
    });
    it('renders error with title parameter', async () => {
      const page = await newSpecPage({
        components: [StatementsChart],
        html: `<railz-statements-chart options='{title: "Cashflow Statements"}'></railz-statements-chart>`,
      });
      expect(page.root).toEqualHtml(`
      <railz-statements-chart options='{title: "Cashflow Statements"}'>
        <mock:shadow-root>
            <div class="railz-container">
                <railz-error-image statuscode="500"></railz-error-image>
            </div>
        </mock:shadow-root>
      </railz-statements-chart>
    `);
    });
  });
  describe.skip('Render successfully due to correct parameters', () => {});
});
