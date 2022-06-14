import { newSpecPage } from '@stencil/core/testing';

import { Core } from '../core';

describe.skip('railz-pie-chart', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Core],
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

// yarn test packages/components/src/elements/core/test/core.spec.tsx
