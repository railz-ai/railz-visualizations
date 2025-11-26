import { newSpecPage } from '@stencil/core/testing';

import { FinancialForecasts } from '../financial-forecasts';

describe('financial-forecasts', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FinancialForecasts],
      html: `<financial-forecasts></financial-forecasts>`,
    });
    expect(page.root).toEqualHtml(`
      <financial-forecasts>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </financial-forecasts>
    `);
  });
});
