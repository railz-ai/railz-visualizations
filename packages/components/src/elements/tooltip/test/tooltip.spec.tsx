/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';

import { Tooltip } from '../tooltip';

describe('railz-tooltip', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [Tooltip],
      template: () => <railz-tooltip tooltipText={''}></railz-tooltip>,
    });
    expect(page.root).toEqualHtml(`
    <railz-tooltip><mock:shadow-root></mock:shadow-root></railz-tooltip>
    `);
  });

  it('renders with tooltipText', async () => {
    const page = await newSpecPage({
      components: [Tooltip],
      template: () => <railz-tooltip tooltipText="tooltipText"></railz-tooltip>,
    });
    expect(page.root).toEqualHtml(`
    <railz-tooltip>
      <mock:shadow-root>
        <div class="rv-tooltip" style="color: #9E9E9E;">
          <div class="rv-tooltip-image">
            <svg width="13px" height="13px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path stroke="#9E9E9E" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"></path>
            </svg>
          </div>
          <span class="rv-bottom-center rv-tooltiptext">
            tooltipText
          </span>
        </div>
      </mock:shadow-root>
    </railz-tooltip>
    `);
  });

  it('renders with tooltipText and text', async () => {
    const page = await newSpecPage({
      components: [Tooltip],
      template: () => <railz-tooltip tooltipText="tooltipText" text="text"></railz-tooltip>,
    });
    expect(page.root).toEqualHtml(`
    <railz-tooltip>
      <mock:shadow-root>
        <div class="rv-tooltip" style="color: #9E9E9E;">
          <div class="rv-tooltip-image">
            text
          </div>
          <span class="rv-bottom-center rv-tooltiptext">
            tooltipText
          </span>
        </div>
      </mock:shadow-root>
    </railz-tooltip>
    `);
  });

  it('renders with tooltipText, text and tooltipStyle', async () => {
    const page = await newSpecPage({
      components: [Tooltip],
      template: () => (
        <railz-tooltip
          tooltipText="tooltipText"
          text="text"
          tooltipStyle={{ position: 'bottom-right' }}
        ></railz-tooltip>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-tooltip>
      <mock:shadow-root>
        <div class="rv-tooltip" style="color: #9E9E9E;">
          <div class="rv-tooltip-image">
            text
          </div>
          <span class="rv-bottom-right rv-tooltiptext">
            tooltipText
          </span>
        </div>
      </mock:shadow-root>
    </railz-tooltip>
    `);
  });
});

// yarn test packages/components/src/elements/tooltip/test/tooltip.spec.tsx
