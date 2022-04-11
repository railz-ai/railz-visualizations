# railz-progress-bar

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
- [railz-percentage](../percentage)

### Graph

```mermaid
graph TD;
  railz-pie-chart --> railz-error-image
  railz-pie-chart --> railz-loading
  railz-pie-chart --> railz-percentage
  railz-visualizations --> railz-pie-chart
  style railz-pie-chart fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
