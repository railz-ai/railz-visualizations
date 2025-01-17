# railz-business-valuations

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute | Description                                                 | Type                      | Default     |
| ---------------------------- | --------- | ----------------------------------------------------------- | ------------------------- | ----------- |
| `configuration` _(required)_ | --        | Configuration information like authentication configuration | `RVConfiguration`         | `undefined` |
| `filter` _(required)_        | --        | Filter information to query the backend APIs                | `RVFilterTaxBenchmarking` | `undefined` |
| `options`                    | --        | For whitelabeling styling                                   | `RVOptions`               | `undefined` |

## Dependencies

### Depends on

- [railz-error-image](../error)
- [railz-loading](../loading)
- [railz-tooltip](../tooltip)

### Graph

```mermaid
graph TD;
  railz-tax-benchmarking --> railz-error-image
  railz-tax-benchmarking --> railz-loading
  railz-tax-benchmarking --> railz-tooltip
  style railz-tax-benchmarking fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
