/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop } from '@stencil/core';
import { isEmpty } from 'lodash-es';

import { TooltipImage } from './tooltip-image';

@Component({
  tag: 'railz-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true,
})
export class Tooltip {
  /**
   * Question mark with a tooltip text
   */
  @Prop() readonly text: string = '';
  @Prop() readonly tooltipText!: string;

  render(): HTMLElement {
    return (
      !isEmpty(this.tooltipText) && (
        <div class="railz-tooltip">
          {isEmpty(this.text) ? <TooltipImage /> : this.text}
          <span class="railz-tooltiptext">{this.tooltipText}</span>
        </div>
      )
    );
  }
}
