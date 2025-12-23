/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop } from '@stencil/core';

import Translations from '../../config/translations/en.json';

import { Error202, Error204, Error404, Error422, Error500 } from './images';

@Component({
  tag: 'railz-error-image',
  styleUrl: './error-image.scss',
  shadow: true,
})
export class ErrorImage {
  /**
   * Status code based on HTTP Response codes
   */
  @Prop() readonly statusCode?: number;
  /**
   * Fill color of the svg image representing a status code
   */
  @Prop() readonly fillColor?: string = '#949494';

  /**
   * Width of the SVG Error Indicator
   */
  @Prop() readonly width?: string;

  /**
   * Height of the SVG Error Indicator
   */
  @Prop() readonly height?: string;

  /**
   * Style of the image text
   */
  @Prop() readonly textStyle?: { [key: string]: any };

  render(): HTMLElement {
    switch (this.statusCode) {
      case 202:
        return (
          <div>
            <Error202 fillColor={this.fillColor} width={this.width} height={this.height} />
            <p class="rv-error-title" style={this.textStyle}>
              {Translations.RV_ERROR_202_TITLE}
            </p>
          </div>
        );
      case 204:
        return (
          <div>
            <Error204 fillColor={this.fillColor} width={this.width} height={this.height} />
            <p class="rv-error-title" style={this.textStyle}>
              {Translations.RV_ERROR_204_TITLE}
            </p>
          </div>
        );
      case 404:
        return (
          <div>
            <Error404 fillColor={this.fillColor} width={this.width} height={this.height} />
            <p class="rv-error-title" style={this.textStyle}>
              {Translations.DASHBOARD_FINANCIAL_SUMMARY_CHART_ERROR_ASP_NOT_SUPPORTED}
            </p>
          </div>
        );
      case 422:
        return (
          <div>
            <Error422 fillColor={this.fillColor} width={this.width} height={this.height} />
            <p class="rv-error-title" style={this.textStyle}>
              {Translations.RV_ERROR_422_TITLE}
            </p>
            {/* if(financialForacasts) show different title and sub title
            <p class="rv-error-subtitle" style={this.textStyle}>
              {Translations.RV_ERROR_422_SUBTITLE}
            </p> */}
          </div>
        );
      default:
        return (
          <div>
            <Error500 fillColor={this.fillColor} width={this.width} height={this.height} />
            <p class="rv-error-title" style={this.textStyle}>
              {Translations.RV_ERROR_500_TITLE}
            </p>
          </div>
        );
    }
  }
}
