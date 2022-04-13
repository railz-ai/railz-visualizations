import { newSpecPage } from '@stencil/core/testing';

import { PieChart } from '../pie-chart';

describe.skip('railz-pie-chart', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PieChart],
      html: `<railz-pie-chart></railz-pie-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-pie-chart>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </railz-pie-chart>
    `);
  });
});
