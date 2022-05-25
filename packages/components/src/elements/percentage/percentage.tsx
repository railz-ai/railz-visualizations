/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop } from '@stencil/core';
import { isNull } from 'lodash-es';

@Component({
  tag: 'railz-percentage',
  styleUrl: 'percentage.scss',
  shadow: true,
})
export class Percentage {
  /**
   * Percentage to show
   */
  @Prop() readonly percentage!: number;

  render(): HTMLElement {
    if (isNull(this.percentage) || this.percentage === 0) {
      return null;
    }
    return (
      <div class="railz-percentage">
        {this.percentage > 0 ? (
          <div class="positive">&#x25B2; {this.percentage}%</div>
        ) : (
          <div class="negative">&#x25BC; {this.percentage}%</div>
        )}
      </div>
    );
  }
}
