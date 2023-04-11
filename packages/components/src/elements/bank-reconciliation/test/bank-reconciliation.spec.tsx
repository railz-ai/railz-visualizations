/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';

import { BankReconciliation } from '../bank-reconciliation';

describe('railz-bank-reconciliation', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [BankReconciliation],
      html: `<railz-bank-reconciliation></railz-bank-reconciliation>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-bank-reconciliation>
        <mock:shadow-root>
          <railz-error-image statuscode="500"></railz-error-image>
        </mock:shadow-root>
      </railz-bank-reconciliation>
    `);
  });
});

// yarn test packages/components/src/elements/progress-bar/test/progress-bar.spec.tsx
