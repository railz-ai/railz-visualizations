import { newSpecPage } from '@stencil/core/testing';

import { TransactionsControl } from '../transactions-control';

// TODO: write tests
describe.skip('transactions-control', () => {
  it('renders empty without parameter', async () => {
    const page = await newSpecPage({
      components: [TransactionsControl],
      html: `<railz-transactions-control></railz-transactions-control>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-transactions-control>
        <mock:shadow-root>
            <div class="global-div">
              <div></div>
            </div>
        </mock:shadow-root>
      </railz-transactions-control>
    `);
  });
  it('renders header with title parameter', async () => {
    const page = await newSpecPage({
      components: [TransactionsControl],
      html: `<railz-transactions-control options='{title: "Invoices"}'></railz-transactions-control>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-transactions-control>
        <mock:shadow-root>
            <div class="global-div">
                <p class="title">Cashflow Statements</p>
            </div>
        </mock:shadow-root>
      </railz-transactions-control>
    `);
  });
  it('renders header with error parameter', async () => {
    const page = await newSpecPage({
      components: [TransactionsControl],
      html: `<railz-transactions-control error="true"></railz-transactions-control>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-transactions-control>
        <mock:shadow-root>
            <div class="global-div">
              <railz-error-image error="true" statuscode="500"></railz-error-image>
            </div>
        </mock:shadow-root>
      </railz-transactions-control>
    `);
  });
  it('renders header with all valid parameter', async () => {
    const page = await newSpecPage({
      components: [TransactionsControl],
      html: `<railz-transactions-control error="true"></railz-transactions-control>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-transactions-control>
        <mock:shadow-root>
            <div class="global-div">
                <p class="title">Cashflow Statements</p>
                <railz-error-image error="true" statuscode="500"></railz-error-image>
            </div>
        </mock:shadow-root>
      </railz-transactions-control>
    `);
  });
});
