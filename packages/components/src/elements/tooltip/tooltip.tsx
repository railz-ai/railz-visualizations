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
  /**
   * Position of the Tooltip text when hovered
   */
  @Prop() readonly position?: string = 'bottom-right';

  render(): HTMLElement {
    return (
      !isEmpty(this.tooltipText) && (
        <div class="rv-tooltip">
          {isEmpty(this.text) ? <TooltipImage /> : this.text}
          <span class={`rv-tooltiptext rv-${this.position}`}>{this.tooltipText}</span>
        </div>
      )
    );
  }
}
