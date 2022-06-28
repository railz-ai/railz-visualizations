/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop } from '@stencil/core';
import { isNull } from 'lodash-es';
import { RVOptionsPercentageStyle } from '../../types';

@Component({
  tag: 'railz-percentage',
  styleUrl: 'percentage.scss',
  shadow: true,
})
export class Percentage {
  /**
   * Percentage to show
   */
  @Prop() readonly percentage: number = 0;

  @Prop() readonly percentageStyle?: RVOptionsPercentageStyle;

  render(): HTMLElement {
    if (isNull(this.percentage) || this.percentage === 0) {
      return null;
    }
    return (
      <div class="railz-percentage">
        {this.percentage > 0 ? (
          <div class="positive" style={{ color: this.percentageStyle?.positive }}>
            &#x25B2; {this.percentage}%
          </div>
        ) : (
          <div class="negative" style={{ color: this.percentageStyle?.negative }}>
            &#x25BC; {this.percentage}%
          </div>
        )}
      </div>
    );
  }
}
