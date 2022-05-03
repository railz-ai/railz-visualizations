# railz-progress-bar

<!-- Auto Generated Below -->

## Properties

| Property                   | Attribute      | Description                               | Type             | Default                         |
| -------------------------- | -------------- | ----------------------------------------- | ---------------- | ------------------------------- |
| `text`                     | `text`         | Question mark with a tooltip text         | `string`         | `''`                            |
| `tooltipStyle`             | --             | Position of the Tooltip text when hovered | `RVTooltipStyle` | `{ position: 'bottom-center' }` |
| `tooltipText` _(required)_ | `tooltip-text` |                                           | `string`         | `undefined`                     |

## Dependencies

### Used by

- [railz-financial-ratios](../financial-ratios)
- [railz-gauge-chart](../gauge-chart)
- [railz-pie-chart](../pie-chart)

### Graph

```mermaid
graph TD;
  railz-financial-ratios --> railz-tooltip
  railz-gauge-chart --> railz-tooltip
  railz-pie-chart --> railz-tooltip
  style railz-tooltip fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
