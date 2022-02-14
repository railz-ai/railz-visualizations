import { newSpecPage } from '@stencil/core/testing';
import { ChartContainer } from '../chart-container';

describe('chart-container', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChartContainer],
      html: `<railz-chart-container></railz-chart-container>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-chart-container>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </railz-chart-container>
    `);
  });
});
