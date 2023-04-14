# railz-progress-bar

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute | Description                                                 | Type                               | Default     |
| ---------------------------- | --------- | ----------------------------------------------------------- | ---------------------------------- | ----------- |
| `configuration` _(required)_ | --        | Configuration information like authentication configuration | `RVConfiguration`                  | `undefined` |
| `filter` _(required)_        | --        | Filter information to query the backend APIs                | `RVFilterBankReconciliation`       | `undefined` |
| `options`                    | --        | For whitelabeling styling                                   | `RVOptionsBankReconciliationStyle` | `undefined` |

## Dependencies

### Depends on

- [railz-error-image](../error)
- [railz-tooltip](../tooltip)
- [railz-gauge-chart](../gauge-chart)
- [railz-progress-bar](../progress-bar)

### Graph

```mermaid
graph TD;
  railz-bank-reconciliation --> railz-error-image
  railz-bank-reconciliation --> railz-tooltip
  railz-bank-reconciliation --> railz-gauge-chart
  railz-bank-reconciliation --> railz-progress-bar
  style railz-bank-reconciliation fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_