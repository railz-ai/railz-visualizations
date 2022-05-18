# railz-error-image

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                            | Type                      | Default     |
| ------------ | ------------- | ------------------------------------------------------ | ------------------------- | ----------- |
| `fillColor`  | `fill-color`  | Fill color of the svg image representing a status code | `string`                  | `'#949494'` |
| `height`     | `height`      | Height of the SVG Error Indicator                      | `string`                  | `undefined` |
| `statusCode` | `status-code` | Status code based on HTTP Response codes               | `number`                  | `undefined` |
| `text`       | `text`        | Text to display at the bottom of the svg image         | `string`                  | `undefined` |
| `textStyle`  | --            | Color of the image text                                | `{ [key: string]: any; }` | `undefined` |
| `width`      | `width`       | Width of the SVG Error Indicator                       | `string`                  | `undefined` |

## Dependencies

### Used by

- [railz-bank-accounts](../bank-accounts)
- [railz-financial-ratios](../financial-ratios)
- [railz-gauge-chart](../gauge-chart)
- [railz-pie-chart](../pie-chart)
- [railz-statements-chart](../statements-chart)
- [railz-transactions-control](../transactions-control)
- [railz-visualizations](../core)

### Graph

```mermaid
graph TD;
  railz-bank-accounts --> railz-error-image
  railz-financial-ratios --> railz-error-image
  railz-gauge-chart --> railz-error-image
  railz-pie-chart --> railz-error-image
  railz-statements-chart --> railz-error-image
  railz-transactions-control --> railz-error-image
  railz-visualizations --> railz-error-image
  style railz-error-image fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
