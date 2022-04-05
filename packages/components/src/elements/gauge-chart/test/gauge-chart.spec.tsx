import { newSpecPage } from '@stencil/core/testing';

import { GaugeChart } from '../gauge-chart';

describe.skip('railz-gauge-chart', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GaugeChart],
      html: `<railz-gauge-chart></railz-gauge-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-gauge-chart>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </railz-gauge-chart>
    `);
  });
});
