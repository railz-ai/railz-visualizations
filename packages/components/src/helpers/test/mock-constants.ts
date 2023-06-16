import { RVBalanceSheetSummary } from '../../types';

export const mockMonth1: RVBalanceSheetSummary = {
  period: {
    date: '2016-01-01',
    day: 15,
    month: 3,
    quarter: 1,
    year: 2022,
  },
  assets: 123,
  equity: 456,
  liabilities: 789,
};

export const mockMonth2: RVBalanceSheetSummary = {
  period: {
    date: '2016-02-01',
    day: 15,
    month: 3,
    quarter: 1,
    year: 2022,
  },
  assets: 123,
  equity: 456,
  liabilities: 789,
};
