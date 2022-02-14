# railz-transactions-control



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute | Description | Type                                                             | Default     |
| ---------------------------- | --------- | ----------- | ---------------------------------------------------------------- | ----------- |
| `configuration` _(required)_ | --        |             | `RVConfiguration`                                                | `undefined` |
| `filter` _(required)_        | --        |             | `RVBaseFilterBusinessDateType \| RVBaseFilterConnectionDateType` | `undefined` |
| `options`                    | --        |             | `RVOptions`                                                      | `undefined` |


## Dependencies

### Used by

 - [railz-visualizations](../core)

### Depends on

- [railz-error-image](../../elements/error)
- [railz-loading](../../elements/loading)
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

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
