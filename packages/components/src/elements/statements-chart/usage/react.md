```typescript jsx
import { RailzStatementsChart } from '@railzai/railz-visualizations-react';

<RailzStatementsChart
  configuration={{
    token: 'your token...',
  }}
  filter={{
    startDate: '2021-03-01',
    endDate: '2021-12-31',
    reportFrequency: 'month',
    reportType: 'balanceSheets',
    businessName: 'your business name...',
    serviceName: 'quickbooks',
  }}
/>;
```
