# railz-visualizations

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute | Description                                                 | Type                                                                                                                                                                                                           | Default     |
| --------------- | --------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `configuration` | --        | Configuration information like authentication configuration | `RVConfiguration`                                                                                                                                                                                              | `undefined` |
| `filter`        | --        | Filter information to query the backend APIs                | `RVBaseFilterBusinessDateFrequencyType \| RVBaseFilterBusinessDateType \| RVBaseFilterBusinessType \| RVBaseFilterConnectionDateFrequencyType \| RVBaseFilterConnectionDateType \| RVBaseFilterConnectionType` | `undefined` |
| `options`       | --        | For whitelabeling styling                                   | `RVOptions`                                                                                                                                                                                                    | `undefined` |

## Dependencies

### Depends on

- [railz-error-image](../../elements/error)
- [railz-statements-chart](../statements-chart)
- [railz-transactions-control](../transactions-control)

### Graph

```mermaid
graph TD;
  railz-visualizations --> railz-error-image
  railz-visualizations --> railz-statements-chart
  railz-visualizations --> railz-transactions-control
  railz-statements-chart --> railz-error-image
  railz-statements-chart --> railz-loading
  railz-transactions-control --> railz-error-image
  railz-transactions-control --> railz-loading
  railz-transactions-control --> railz-progress-bar
  style railz-visualizations fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
