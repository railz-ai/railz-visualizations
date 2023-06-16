# railz-credit-score

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute | Description                                                 | Type                  | Default     |
| ---------------------------- | --------- | ----------------------------------------------------------- | --------------------- | ----------- |
| `configuration` _(required)_ | --        | Configuration information like authentication configuration | `RVConfiguration`     | `undefined` |
| `filter` _(required)_        | --        | Filter information to query the backend APIs                | `RVFilterCreditScore` | `undefined` |
| `options`                    | --        | For whitelabeling styling                                   | `RVOptions`           | `undefined` |

## Dependencies

### Used by

- [railz-visualizations](../core)

### Depends on

- [railz-error-image](../error)
- [railz-loading](../loading)
- [railz-gauge-chart](../gauge-chart)
- [railz-tooltip](../tooltip)

### Graph

```mermaid
graph TD;
  railz-credit-score --> railz-error-image
  railz-credit-score --> railz-loading
  railz-credit-score --> railz-gauge-chart
  railz-credit-score --> railz-tooltip
  railz-visualizations --> railz-credit-score
  style railz-credit-score fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
