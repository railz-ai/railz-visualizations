/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop } from '@stencil/core';
import { isEmpty } from 'lodash-es';

import { TooltipImage } from './tooltip-image';
import { RAILZ_TOOLTIP_COLOR, RVTooltipIndicatorStyle } from '../../types';

@Component({
  tag: 'railz-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true,
})
export class Tooltip {
  /**
   * Question mark with a tooltip text
   */
  @Prop() readonly text?: string = '';
  @Prop() readonly tooltipText!: string;
  /**
   * Position of the Tooltip text when hovered
   */
  @Prop() readonly tooltipStyle?: RVTooltipIndicatorStyle = { position: 'bottom-center' };

  render(): HTMLElement {
    return (
      !isEmpty(this.tooltipText) && (
        <div
          class="rv-tooltip"
          style={{
            color: this.tooltipStyle?.fillColor || RAILZ_TOOLTIP_COLOR,
            ...this.tooltipStyle?.style,
          }}
        >
          <div class="rv-tooltip-image" style={{ ...this.tooltipStyle?.textStyle }}>
            {isEmpty(this.text) ? <TooltipImage {...this.tooltipStyle} /> : this.text}
          </div>
          <span
            class={`rv-tooltiptext rv-${this.tooltipStyle?.position}`}
            style={this.tooltipStyle?.tooltipTextStyle}
          >
            {this.tooltipText}
          </span>
        </div>
      )
    );
  }
}
