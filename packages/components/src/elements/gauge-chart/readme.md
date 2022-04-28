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
- [railz-tooltip](../tooltip)

### Graph

```mermaid
graph TD;
  railz-gauge-chart --> railz-error-image
  railz-gauge-chart --> railz-loading
  railz-gauge-chart --> railz-tooltip
  railz-visualizations --> railz-gauge-chart
  style railz-gauge-chart fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
