# railz-visualizations

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute | Description                                                 | Type                                                                                                                                                                                                                                                                                                                                           | Default     |
| --------------- | --------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `configuration` | --        | Configuration information like authentication configuration | `RVConfiguration`                                                                                                                                                                                                                                                                                                                              | `undefined` |
| `filter`        | --        | Filter information to query the backend APIs                | `RVFilterBalanceSheet \| RVFilterBankAccount \| RVFilterBankReconciliation \| RVFilterBills \| RVFilterBusinessValuations \| RVFilterCashflowStatements \| RVFilterCreditScore \| RVFilterDate \| RVFilterExpenses \| RVFilterFinancialForecasts \| RVFilterFinancialRatio \| RVFilterIncomeStatements \| RVFilterInvoices \| RVFilterRevenue` | `undefined` |
| `options`       | --        | For whitelabeling styling                                   | `RVOptions`                                                                                                                                                                                                                                                                                                                                    | `undefined` |

## Dependencies

### Depends on

- [railz-error-image](../error)
- [railz-bank-reconciliation](../bank-reconciliation)
- [railz-business-valuations](../business-valuations)
- [railz-bank-accounts](../bank-accounts)
- [railz-financial-ratios](../financial-ratios)
- [railz-credit-score](../credit-score)
- [railz-income-statements](../income-statements)
- [railz-statements-chart](../statements-chart)
- [railz-transactions-control](../transactions-control)

### Graph

```mermaid
graph TD;
  railz-visualizations --> railz-error-image
  railz-visualizations --> railz-bank-reconciliation
  railz-visualizations --> railz-business-valuations
  railz-visualizations --> railz-bank-accounts
  railz-visualizations --> railz-financial-ratios
  railz-visualizations --> railz-credit-score
  railz-visualizations --> railz-income-statements
  railz-visualizations --> railz-statements-chart
  railz-visualizations --> railz-transactions-control
  railz-bank-reconciliation --> railz-error-image
  railz-bank-reconciliation --> railz-tooltip
  railz-bank-reconciliation --> railz-gauge-chart
  railz-bank-reconciliation --> railz-progress-bar
  railz-business-valuations --> railz-tooltip
  railz-business-valuations --> railz-error-image
  railz-business-valuations --> railz-loading
  railz-bank-accounts --> railz-error-image
  railz-bank-accounts --> railz-loading
  railz-bank-accounts --> railz-tooltip
  railz-financial-ratios --> railz-error-image
  railz-financial-ratios --> railz-loading
  railz-financial-ratios --> railz-tooltip
  railz-financial-ratios --> railz-percentage
  railz-financial-ratios --> railz-sparkline-chart
  railz-financial-ratios --> railz-select
  railz-credit-score --> railz-error-image
  railz-credit-score --> railz-loading
  railz-credit-score --> railz-gauge-chart
  railz-credit-score --> railz-tooltip
  railz-income-statements --> railz-error-image
  railz-income-statements --> railz-loading
  railz-income-statements --> railz-tooltip
  railz-statements-chart --> railz-error-image
  railz-statements-chart --> railz-loading
  railz-statements-chart --> railz-tooltip
  railz-transactions-control --> railz-error-image
  railz-transactions-control --> railz-loading
  railz-transactions-control --> railz-progress-bar
  railz-transactions-control --> railz-tooltip
  style railz-visualizations fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
