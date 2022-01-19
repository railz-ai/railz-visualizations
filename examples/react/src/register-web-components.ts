/* eslint-disable */
import { HTMLAttributes } from "react";
import {
  applyPolyfills,
  defineCustomElements,
} from "railz-visualizations/loader";
import { JSX as LocalJSX } from "railz-visualizations";

type StencilToReact<T> = {
  [P in keyof T]?: T[P] &
    Omit<HTMLAttributes<Element>, "className"> & {
      class?: string;
    };
};

declare global {
  export namespace JSX {
    interface IntrinsicElements
      extends StencilToReact<LocalJSX.IntrinsicElements> {
      [elemName: string]: any;
    }
  }
}

defineCustomElements(window);

applyPolyfills().then(() => {
  defineCustomElements();
});
