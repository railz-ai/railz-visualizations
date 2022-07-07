# railz-select

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute | Description                             | Type            | Default                                                       |
| ------------- | --------- | --------------------------------------- | --------------- | ------------------------------------------------------------- |
| `items`       | --        | The items to be listed                  | `string[]`      | `['Efficiency', 'Liquidity', 'Profitability', 'Reliability']` |
| `selectStyle` | --        | Position of the Select text when opened | `RVSelectStyle` | `{ position: 'right' }`                                       |

## Events

| Event          | Description | Type                  |
| -------------- | ----------- | --------------------- |
| `selectedItem` |             | `CustomEvent<number>` |

## Dependencies

### Used by

- [railz-financial-ratios](../financial-ratios)

### Graph

```mermaid
graph TD;
  railz-financial-ratios --> railz-select
  style railz-select fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
