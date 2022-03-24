# railz-transactions-control

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute | Description                                                 | Type                                                             | Default     |
| ---------------------------- | --------- | ----------------------------------------------------------- | ---------------------------------------------------------------- | ----------- |
| `configuration` _(required)_ | --        | Configuration information like authentication configuration | `RVConfiguration`                                                | `undefined` |
| `filter` _(required)_        | --        | Filter information to query the backend APIs                | `RVBaseFilterBusinessDateType \| RVBaseFilterConnectionDateType` | `undefined` |
| `options`                    | --        | For whitelabeling styling                                   | `RVOptions`                                                      | `undefined` |

## Dependencies

### Used by

- [railz-visualizations](../core)

### Depends on

- [railz-error-image](../error)
- [railz-loading](../loading)
- [railz-progress-bar](../progress-bar)

### Graph

```mermaid
graph TD;
  railz-transactions-control --> railz-error-image
  railz-transactions-control --> railz-loading
  railz-transactions-control --> railz-progress-bar
  railz-visualizations --> railz-transactions-control
  style railz-transactions-control fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
