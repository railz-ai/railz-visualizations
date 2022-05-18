/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop } from '@stencil/core';
import { isEmpty } from 'lodash-es';

import { RVTooltipStyle } from '../../types';

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
  @Prop() readonly tooltipStyle?: RVTooltipStyle = { position: 'bottom-center' };

  render(): HTMLElement {
    return (
      !isEmpty(this.tooltipText) && (
        <div class="rv-tooltip">
          <div class="rv-tooltip-image">{isEmpty(this.text) ? <TooltipImage /> : this.text}</div>
          <span class={`rv-tooltiptext rv-${this.tooltipStyle?.position}`}>{this.tooltipText}</span>
        </div>
      )
    );
  }
}
