import { newSpecPage } from '@stencil/core/testing';

import { StatementsChart } from '../statements-chart';
// TODO: write tests
describe.skip('statements-chart', () => {
  it('renders empty without parameter', async () => {
    const page = await newSpecPage({
      components: [StatementsChart],
      html: `<railz-statements-chart></railz-statements-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-statements-chart>
        <mock:shadow-root>
            <div class="global-div">
              <div></div>
            </div>
        </mock:shadow-root>
      </railz-statements-chart>
    `);
  });
  it('renders header with title parameter', async () => {
    const page = await newSpecPage({
      components: [StatementsChart],
      html: `<railz-statements-chart options='{title: "Cashflow Statements"}'></railz-statements-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-statements-chart>
        <mock:shadow-root>
            <div class="global-div">
                <p class="title">Cashflow Statements</p>
            </div>
        </mock:shadow-root>
      </railz-statements-chart>
    `);
  });
  it('renders header with error parameter', async () => {
    const page = await newSpecPage({
      components: [StatementsChart],
      html: `<railz-statements-chart error="true"></railz-statements-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-statements-chart>
        <mock:shadow-root>
            <div class="global-div">
              <railz-error-image error="true" statuscode="500"></railz-error-image>
            </div>
        </mock:shadow-root>
      </railz-statements-chart>
    `);
  });
  it('renders header with all valid parameter', async () => {
    const page = await newSpecPage({
      components: [StatementsChart],
      html: `<railz-statements-chart error="true"></railz-statements-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-statements-chart>
        <mock:shadow-root>
            <div class="global-div">
                <p class="title">Cashflow Statements</p>
                <railz-error-image error="true" statuscode="500"></railz-error-image>
            </div>
        </mock:shadow-root>
      </railz-statements-chart>
    `);
  });
});
