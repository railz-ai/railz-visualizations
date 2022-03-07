import { newSpecPage } from '@stencil/core/testing';

import { ProgressBar } from '../progress-bar';

describe.skip('progress-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<progress-bar></progress-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <progress-bar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </progress-bar>
    `);
  });
});
