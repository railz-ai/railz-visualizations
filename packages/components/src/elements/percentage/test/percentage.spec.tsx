import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';

import { Percentage } from '../percentage';

describe('railz-percentage', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [Percentage],
      template: () => <railz-percentage />,
    });
    expect(page.root).toEqualHtml(`
    <railz-percentage>
      <mock:shadow-root>
      </mock:shadow-root>
    </railz-percentage>
    `);
  });

  it('renders with positive percentage', async () => {
    const page = await newSpecPage({
      components: [Percentage],
      template: () => <railz-percentage percentage={10} />,
    });
    expect(page.root).toEqualHtml(`
    <railz-percentage>
      <mock:shadow-root>
        <div class="railz-percentage">
          <div class="positive">
            ▲ 10%
          </div>
        </div>
      </mock:shadow-root>
    </railz-percentage>
    `);
  });

  it('renders with negative percentage', async () => {
    const page = await newSpecPage({
      components: [Percentage],
      template: () => <railz-percentage percentage={-22} />,
    });
    expect(page.root).toEqualHtml(`
    <railz-percentage>
      <mock:shadow-root>
        <div class="railz-percentage">
          <div class="negative">
            ▼ -22%
          </div>
        </div>
      </mock:shadow-root>
    </railz-percentage>
    `);
  });
});

// yarn test packages/components/src/elements/percentage/test/percentage.spec.tsx
