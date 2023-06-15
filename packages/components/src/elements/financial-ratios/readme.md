# railz-financial-ratios

<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute | Description                                                 | Type                     | Default     |
| ---------------------------- | --------- | ----------------------------------------------------------- | ------------------------ | ----------- |
| `configuration` _(required)_ | --        | Configuration information like authentication configuration | `RVConfiguration`        | `undefined` |
| `filter` _(required)_        | --        | Filter information to query the backend APIs                | `RVFilterFinancialRatio` | `undefined` |
| `options`                    | --        | For whitelabeling styling                                   | `RVOptions`              | `undefined` |


## Dependencies

### Used by

 - [railz-visualizations](../core)

### Depends on

- [railz-error-image](../error)
- [railz-loading](../loading)
- [railz-tooltip](../tooltip)
- [railz-percentage](../percentage)
- [railz-sparkline-chart](../sparkline-chart)
- [railz-select](../select)

### Graph
```mermaid
graph TD;
  railz-financial-ratios --> railz-error-image
  railz-financial-ratios --> railz-loading
  railz-financial-ratios --> railz-tooltip
  railz-financial-ratios --> railz-percentage
  railz-financial-ratios --> railz-sparkline-chart
  railz-financial-ratios --> railz-select
  railz-visualizations --> railz-financial-ratios
  style railz-financial-ratios fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
