import { newSpecPage } from '@stencil/core/testing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { BanksAccounts } from '../bank-accounts';
import { RVReportTypes } from '../../../types';
import { RVAllProviders } from '../../../types/enum/service-providers';
import * as BanksAccountsUtils from '../bank-accounts.utils';

import BankAccountsData from './bankAccountsData.json';

describe('railz-bank-accounts', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [BanksAccounts],
      html: `<railz-bank-accounts></railz-bank-accounts>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-bank-accounts>
        <mock:shadow-root></mock:shadow-root>
      </railz-bank-accounts>
    `);
  });

  it('renders without data', async () => {
    const page = await newSpecPage({
      components: [BanksAccounts],
      template: () => (
        <railz-bank-accounts
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.BANK_ACCOUNT,
          }}
        ></railz-bank-accounts>
      ),
    });
    expect(page.root).toEqualHtml(`
      <railz-bank-accounts>
         <mock:shadow-root>
           <div class="rv-container">
             <div class="rv-header-container">
               <p class="rv-title">
                 Bank Accounts
               </p>
             </div>
             <railz-error-image statuscode="204"></railz-error-image>
           </div>
         </mock:shadow-root>
      </railz-bank-accounts>
    `);
  });

  it('renders without data and failed', async () => {
    jest.spyOn(BanksAccountsUtils, 'getReportData').mockImplementation((): any => {
      throw new Error('Failed to get result');
    });

    const page = await newSpecPage({
      components: [BanksAccounts],
      template: () => (
        <railz-bank-accounts
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.BANK_ACCOUNT,
          }}
        ></railz-bank-accounts>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-bank-accounts>
    <mock:shadow-root>
      <div class="rv-container">
        <div class="rv-header-container">
          <p class="rv-title">
            Bank Accounts
          </p>
        </div>
      </div>
    </mock:shadow-root>
  </railz-bank-accounts>
    `);
  });
  it('renders with data', async () => {
    jest
      .spyOn(BanksAccountsUtils, 'getReportData')
      .mockImplementation((): any => Promise.resolve(BankAccountsData));

    const page = await newSpecPage({
      components: [BanksAccounts],
      template: () => (
        <railz-bank-accounts
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.BANK_ACCOUNT,
          }}
        ></railz-bank-accounts>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-bank-accounts>
    <mock:shadow-root>
      <div class="rv-container">
        <div class="rv-header-container">
          <p class="rv-title">
            Bank Accounts
          </p>
        </div>
        <div class="rv-bank-list">
      <ul class="rv-bank-accounts-ul">
        <div>
          <li class="rv-bank-accounts-ul-title">
            TD Bank
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid Checking
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $110.00
              </span>
            </div>
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid Saving
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $210.00
              </span>
            </div>
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid CD
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $1,000.00
              </span>
            </div>
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid Credit Card
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $410.00
              </span>
            </div>
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid Money Market
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $43,200.00
              </span>
            </div>
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid IRA
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $320.76
              </span>
            </div>
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid 401k
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $23,631.98
              </span>
            </div>
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid Student Loan
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $65,262.00
              </span>
            </div>
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid Mortgage
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $56,302.06
              </span>
            </div>
          </li>
        </div>
        <div>
          <li class="rv-bank-accounts-ul-title">
            RBC Royal Bank
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid Checking
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $110.00
              </span>
            </div>
          </li>
          <li>
            <div class="rv-bank-accounts-item-container">
              <span class="rv-bank-accounts-item-name">
                Plaid Saving
              </span>
              <span class="rv-bank-accounts-item-dot"></span>
              <span class="rv-bank-accounts-item-value">
                $210.00
              </span>
            </div>
          </li>
        </div>
      </ul>
    </div>
      </div>
    </mock:shadow-root>
  </railz-bank-accounts>
    `);
  });
});

// yarn test packages/components/src/elements/table-accounts/test/table-accounts.spec.tsx
