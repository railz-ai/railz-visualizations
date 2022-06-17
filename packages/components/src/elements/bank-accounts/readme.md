# railz-progress-bar

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute | Description                                                 | Type                  | Default     |
| ---------------------------- | --------- | ----------------------------------------------------------- | --------------------- | ----------- |
| `configuration` _(required)_ | --        | Configuration information like authentication configuration | `RVConfiguration`     | `undefined` |
| `filter` _(required)_        | --        | Filter information to query the backend APIs                | `RVFilterBankAccount` | `undefined` |
| `options`                    | --        | For whitelabeling styling                                   | `RVOptions`           | `undefined` |

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
  railz-bank-accounts --> railz-error-image
  railz-bank-accounts --> railz-loading
  railz-bank-accounts --> railz-tooltip
  railz-visualizations --> railz-bank-accounts
  style railz-bank-accounts fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
