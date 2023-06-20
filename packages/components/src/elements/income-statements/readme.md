# railz-income-statements

<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute | Description                                                 | Type                                  | Default     |
| ---------------------------- | --------- | ----------------------------------------------------------- | ------------------------------------- | ----------- |
| `configuration` _(required)_ | --        | Configuration information like authentication configuration | `RVConfiguration`                     | `undefined` |
| `filter` _(required)_        | --        | Filter information to query the backend APIs                | `RVFilterExpenses \| RVFilterRevenue` | `undefined` |
| `options`                    | --        | For whitelabeling styling                                   | `RVOptions`                           | `undefined` |


## Dependencies

### Used by

 - [railz-visualizations](../core)

### Depends on

- [railz-error-image](../error)
- [railz-loading](../loading)
- [railz-tooltip](../tooltip)

### Graph
```mermaid
graph TD;
  railz-income-statements --> railz-error-image
  railz-income-statements --> railz-loading
  railz-income-statements --> railz-tooltip
  railz-visualizations --> railz-income-statements
  style railz-income-statements fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
