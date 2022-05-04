/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h } from '@stencil/core';

@Component({
  tag: 'railz-bank-accounts',
  styleUrl: 'bank-accounts.scss',
  shadow: true,
})
export class ProgressBar {
  render(): HTMLElement {
    const elements = [
      { name: 'Plaid Checking', value: '$110.00' },
      { name: 'Plaid Saving', value: '$210.00' },
      { name: 'Plaid CD', value: '$1,000.00' },
      { name: 'Plaid Credit Card', value: '$410.00' },
      { name: 'Plaid Money Market', value: '$43,200.00' },
      { name: 'Plaid IRA', value: '$320.76' },
      { name: 'Plaid 401 K', value: '$23,631.98' },
      { name: 'Plaid Student Loan', value: '$65,262.00' },
      { name: 'Plaid Mortgage', value: '$56,302.06' },
    ];

    return (
      <div>
        <ul class="railz-bank-accounts-ul">
          <li class="railz-bank-accounts-ul-title">Citibank Online</li>
          {elements.map((element) => {
            return (
              <li class="">
                <div class="railz-bank-accounts-item-container">
                  <span class="railz-bank-accounts-item-name">{element.name}</span>
                  <span class="railz-bank-accounts-item-dot"></span>
                  <span class="railz-bank-accounts-item-value">{element.value}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
