/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop } from "@stencil/core";

import Translations from "../../config/translations/en.json";

import { Error202, Error204, Error500 } from "./images";

@Component({
  tag: "railz-error-image",
  styleUrl: "./error-image.scss",
  shadow: true,
})
export class ErrorImage {
  @Prop() readonly statusCode!: number;
  @Prop() readonly message?: string;
  @Prop() readonly fillColor?: string = "#949494";
  @Prop() readonly textColor?: string = "#424242";

  render(): HTMLElement {
    switch (this.statusCode) {
      case 202:
        return (
          <div>
            <Error202 fillColor={this.fillColor} />
            <p class="railz-error-title" style={{ color: this.textColor }}>
              {this.message || Translations.ERROR_202_TITLE}
            </p>
          </div>
        );
      case 204:
      case 404:
        return (
          <div>
            <Error204 fillColor={this.fillColor} />
            <p class="railz-error-title" style={{ color: this.textColor }}>
              {this.message || Translations.ERROR_204_TITLE}
            </p>
          </div>
        );
      default:
        return (
          <div>
            <Error500 fillColor={this.fillColor} />
            <p class="railz-error-title" style={{ color: this.textColor }}>
              {this.message || Translations.ERROR_500_TITLE}
            </p>
          </div>
        );
    }
  }
}
