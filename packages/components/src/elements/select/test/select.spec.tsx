/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';

import { Select } from '../select';

describe('railz-select', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [Select],
      template: () => <railz-select></railz-select>,
    });
    expect(page.root).toEqualHtml(`
      <railz-select>
        <mock:shadow-root>
          <div class="noselect rv-select">
            <span>
              Efficiency
            </span>
            <div style="transform: rotate(0deg); width: 24px; height: 24px;">
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z"></path>
              </svg>
            </div>
            <span class="false rv-right rv-select-text">
              <span class="rv-select-text-selected">
                Efficiency
              </span>
              <span>
                Liquidity
              </span>
              <span>
                Profitability
              </span>
              <span>
                Reliability
              </span>
            </span>
          </div>
        </mock:shadow-root>
        </railz-select>
      `);
  });
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [Select],
      template: () => <railz-select items={[]}></railz-select>,
    });
    expect(page.root).toEqualHtml(`
      <railz-select>
        <mock:shadow-root>
        </mock:shadow-root>
        </railz-select>
      `);
  });
});

// yarn test packages/components/src/elements/select/test/select.spec.tsx
