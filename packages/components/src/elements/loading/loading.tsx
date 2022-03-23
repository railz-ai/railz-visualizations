/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { Component, h, Prop } from '@stencil/core';

import { RAILZ_PRIMARY_COLOR } from '../../types';

@Component({
  tag: 'railz-loading',
  styleUrl: './loading.scss',
  shadow: true,
})
export class Loading {
  /**
   * Text to display at the bottom of the loading indicator
   */
  @Prop() readonly loadingText?: string;
  /**
   * Fill color of the loading indicator
   */
  @Prop() readonly fillColor?: string = RAILZ_PRIMARY_COLOR;

  /**
   * Color of the loading text
   */
  @Prop() readonly textColor?: string = '#000000';

  /**
   * Width of the SVG Loading Indicator
   */
  @Prop() readonly width?: string = '48px';

  /**
   * Height of the SVG Loading Indicator
   */
  @Prop() readonly height?: string = '48px';

  render(): HTMLElement {
    return (
      <div class="railz-loading-container">
        <svg
          aria-hidden="true"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width={this.width || '48px'}
          height={this.height || '48px'}
          viewBox={'0 0 50 50'}
          style={{ 'enable-background': 'new 0 0 50 50' }}
          xmlSpace="preserve"
        >
          <path
            fill={this.fillColor || RAILZ_PRIMARY_COLOR}
            d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            transform="rotate(360 -4.05439e-8 -4.05439e-8)"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
        </svg>
        {this.loadingText && (
          <p class="railz-loading-title" style={{ color: this.textColor || '#000000' }}>
            {this.loadingText}
          </p>
        )}
      </div>
    );
  }
}
