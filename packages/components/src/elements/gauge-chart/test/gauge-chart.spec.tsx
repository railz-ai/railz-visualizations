import { newSpecPage } from '@stencil/core/testing';
import { GaugeChart } from '../gauge-chart';

describe('gauge-chart', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GaugeChart],
      html: `<gauge-chart></gauge-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <gauge-chart>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gauge-chart>
    `);
  });
});
