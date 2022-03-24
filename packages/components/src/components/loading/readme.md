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

- [railz-statements-chart](../statements-chart)
- [railz-transactions-control](../transactions-control)

### Graph

```mermaid
graph TD;
  railz-statements-chart --> railz-loading
  railz-transactions-control --> railz-loading
  style railz-loading fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
