# railz-statements-chart



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute | Description | Type                                                                               | Default     |
| ---------------------------- | --------- | ----------- | ---------------------------------------------------------------------------------- | ----------- |
| `configuration` _(required)_ | --        |             | `RVConfiguration`                                                                  | `undefined` |
| `filter` _(required)_        | --        |             | `RVBaseFilterBusinessDateFrequencyType \| RVBaseFilterConnectionDateFrequencyType` | `undefined` |
| `options`                    | --        |             | `RVOptions`                                                                        | `undefined` |


## Dependencies

### Used by

 - [railz-visualizations](../core)

### Depends on

- [railz-error-image](../../elements/error)
- [railz-loading](../../elements/loading)
- [railz-chart-container](../../elements/chart-container)

### Graph
```mermaid
graph TD;
  railz-statements-chart --> railz-error-image
  railz-statements-chart --> railz-loading
  railz-statements-chart --> railz-chart-container
  railz-visualizations --> railz-statements-chart
  style railz-statements-chart fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
