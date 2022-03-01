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
  @Prop() readonly message: string = "";

  render(): HTMLElement {
    switch (this.statusCode) {
      case 202:
        return (
          <div>
            <Error202 />
            {this.message !== "" ? (
              <p class="railz-error-title">{this.message}</p>
            ) : (
              <p class="railz-error-title">{Translations.ERROR_202_TITLE}</p>
            )}
          </div>
        );
      case 204:
      case 404:
        return (
          <div>
            <Error204 />
            {this.message !== "" ? (
              <p class="railz-error-title">{this.message}</p>
            ) : (
              <p class="railz-error-title">{Translations.ERROR_204_TITLE}</p>
            )}
          </div>
        );
      default:
        return (
          <div>
            <Error500 />
            {this.message !== "" ? (
              <p class="railz-error-title">{this.message}</p>
            ) : (
              <p class="railz-error-title">{Translations.ERROR_500_TITLE}</p>
            )}
          </div>
        );
    }
  }
}
