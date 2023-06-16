/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { Loading } from '../loading';
import { RAILZ_TEXT_COLOR } from '../../../types';

describe('railz-loading', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [Loading],
      template: () => <railz-loading />,
    });
    expect(page.root).toEqualHtml(`
    <railz-loading>
      <mock:shadow-root>
        <div class="rv-loading-container">
          <svg aria-hidden="true" height="48px" version="1.1" viewBox="0 0 50 50" width="48px" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px" style="enable-background: new 0 0 50 50;">
            <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" fill="#00884f" transform="rotate(360 -4.05439e-8 -4.05439e-8)">
              <animateTransform attributeName="transform" attributeType="xml" dur="0.6s" from="0 25 25" repeatCount="indefinite" to="360 25 25" type="rotate"></animateTransform>
            </path>
          </svg>
        </div>
      </mock:shadow-root>
    </railz-loading>
    `);
  });
  it('renders with loadingText', async () => {
    const page = await newSpecPage({
      components: [Loading],
      template: () => <railz-loading loadingText="loadingText" />,
    });
    expect(page.root).toEqualHtml(`
    <railz-loading>
      <mock:shadow-root>
        <div class="rv-loading-container">
          <svg aria-hidden="true" height="48px" version="1.1" viewBox="0 0 50 50" width="48px" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px" style="enable-background: new 0 0 50 50;">
            <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" fill="#00884f" transform="rotate(360 -4.05439e-8 -4.05439e-8)">
              <animateTransform attributeName="transform" attributeType="xml" dur="0.6s" from="0 25 25" repeatCount="indefinite" to="360 25 25" type="rotate"></animateTransform>
            </path>
          </svg>
          <p class="rv-loading-title">
            loadingText
          </p>
        </div>
      </mock:shadow-root>
    </railz-loading>
    `);
  });
  it('renders with props', async () => {
    const page = await newSpecPage({
      components: [Loading],
      template: () => (
        <railz-loading
          loadingText="loadingText"
          fillColor={RAILZ_TEXT_COLOR}
          width="24px"
          height="24px"
        />
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-loading>
      <mock:shadow-root>
        <div class="rv-loading-container">
          <svg aria-hidden="true" height="24px" version="1.1" viewBox="0 0 50 50" width="24px" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px" style="enable-background: new 0 0 50 50;">
            <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" fill="#003032" transform="rotate(360 -4.05439e-8 -4.05439e-8)">
              <animateTransform attributeName="transform" attributeType="xml" dur="0.6s" from="0 25 25" repeatCount="indefinite" to="360 25 25" type="rotate"></animateTransform>
            </path>
          </svg>
          <p class="rv-loading-title">
            loadingText
          </p>
        </div>
      </mock:shadow-root>
    </railz-loading>
    `);
  });
});

// yarn test packages/components/src/elements/loading/test/loading.spec.tsx
