import { newSpecPage } from '@stencil/core/testing';

import { RailzGaugeChart } from '../gauge-chart';

describe('gauge-chart', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RailzGaugeChart],
      html: `<gauge-chart></gauge-chart>`,
    });
    expect(page.root).toEqualHtml(`<gauge-chart></gauge-chart>`);
  });
});
