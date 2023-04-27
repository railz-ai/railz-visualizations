# railz-business-valuations

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute | Description                                                 | Type                         | Default     |
| ---------------------------- | --------- | ----------------------------------------------------------- | ---------------------------- | ----------- |
| `configuration` _(required)_ | --        | Configuration information like authentication configuration | `RVConfiguration`            | `undefined` |
| `filter` _(required)_        | --        | Filter information to query the backend APIs                | `RVFilterBusinessValuations` | `undefined` |
| `options`                    | --        | For whitelabeling styling                                   | `RVOptions`                  | `undefined` |

## Dependencies

### Depends on

- [railz-tooltip](../tooltip)
- [railz-error-image](../error)
- [railz-loading](../loading)

### Graph

```mermaid
graph TD;
  railz-business-valuations --> railz-tooltip
  railz-business-valuations --> railz-error-image
  railz-business-valuations --> railz-loading
  style railz-business-valuations fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
