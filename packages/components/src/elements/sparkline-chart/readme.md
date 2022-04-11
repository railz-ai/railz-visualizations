# railz-statements-chart

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute | Description                                                 | Type                                                                               | Default     |
| ---------------------------- | --------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------- |
| `configuration` _(required)_ | --        | Configuration information like authentication configuration | `RVConfiguration`                                                                  | `undefined` |
| `filter` _(required)_        | --        | Filter information to query the backend APIs                | `RVBaseFilterBusinessDateFrequencyType \| RVBaseFilterConnectionDateFrequencyType` | `undefined` |
| `options`                    | --        | For whitelabeling styling                                   | `RVOptions`                                                                        | `undefined` |

## Dependencies

### Used by

- [railz-visualizations](../core)

### Depends on

- [railz-error-image](../error)
- [railz-loading](../loading)

### Graph

```mermaid
graph TD;
  railz-statements-chart --> railz-error-image
  railz-statements-chart --> railz-loading
  railz-visualizations --> railz-statements-chart
  style railz-statements-chart fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
