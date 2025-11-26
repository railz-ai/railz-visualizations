# railz-financial-forecasts

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute | Description                                                 | Type                                                                                                           | Default     |
| ---------------------------- | --------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------- |
| `configuration` _(required)_ | --        | Configuration information like authentication configuration | `RVConfiguration`                                                                                              | `undefined` |
| `filter` _(required)_        | --        | Filter information to query the backend APIs                | `RVFilterBalanceSheet \| RVFilterCashflowStatements \| RVFilterFinancialForecasts \| RVFilterIncomeStatements` | `undefined` |
| `options`                    | --        | For whitelabeling styling                                   | `RVOptions`                                                                                                    | `undefined` |

## Dependencies

### Depends on

- [railz-error-image](../error)
- [railz-loading](../loading)
- [railz-tooltip](../tooltip)

### Graph

```mermaid
graph TD;
  railz-financial-forecasts --> railz-error-image
  railz-financial-forecasts --> railz-loading
  railz-financial-forecasts --> railz-tooltip
  style railz-financial-forecasts fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
