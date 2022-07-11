# railz-loading

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute      | Description                                            | Type                      | Default               |
| ------------- | -------------- | ------------------------------------------------------ | ------------------------- | --------------------- |
| `fillColor`   | `fill-color`   | Fill color of the loading indicator                    | `string`                  | `RAILZ_PRIMARY_COLOR` |
| `height`      | `height`       | Height of the SVG Loading Indicator                    | `string`                  | `'48px'`              |
| `loadingText` | `loading-text` | Text to display at the bottom of the loading indicator | `string`                  | `undefined`           |
| `textStyle`   | --             | Style of the text                                      | `{ [key: string]: any; }` | `undefined`           |
| `width`       | `width`        | Width of the SVG Loading Indicator                     | `string`                  | `'48px'`              |

## Dependencies

### Used by

- [railz-bank-accounts](../bank-accounts)
- [railz-credit-score](../credit-score)
- [railz-financial-ratios](../financial-ratios)
- [railz-income-statements](../income-statements)
- [railz-statements-chart](../statements-chart)
- [railz-transactions-control](../transactions-control)

### Graph

```mermaid
graph TD;
  railz-bank-accounts --> railz-loading
  railz-credit-score --> railz-loading
  railz-financial-ratios --> railz-loading
  railz-income-statements --> railz-loading
  railz-statements-chart --> railz-loading
  railz-transactions-control --> railz-loading
  style railz-loading fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
