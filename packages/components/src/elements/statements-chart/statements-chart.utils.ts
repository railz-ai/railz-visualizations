import { isNil, pick } from 'lodash-es';

import { format, parseISO } from 'date-fns';

import Translations from '../../config/translations/en.json';
import { formatDate, formatSeries, isStatements } from '../../helpers/utils';
import {
  ALL_FONTS,
  RAILZ_BALANCE_SHEET_COLORS,
  RAILZ_CASHFLOW_COLORS,
  RAILZ_INCOME_STATEMENT_COLORS,
  RVAccountingProviders,
  RVBaseFilterBusinessDateFrequencyType,
  RVChartOptionsParameter,
  RVChartStatementBaseParameter,
  RVChartStatementParameter,
  RVFormattedStatementData,
  RVFormattedStatementResponse,
  RVReportRequestParameter,
} from '../../types';
import { RVReportTypes } from '../../types/enum/report-type';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';

/**
 * Setup Highcharts options for bar charts
 */
export const getOptionsBarChart = ({
  categories,
  series,
  colors,
  chart,
}: RVChartOptionsParameter): any => ({
  chart: {
    height: chart?.height,
    type: 'column',
    backgroundColor: chart?.backgroundColor || '#ffffff',
    style: {
      fontFamily: chart?.fontFamily || ALL_FONTS,
    },
    reflow: true,
    marginTop: 0,
    spacingTop: 0,
    spacingRight: 0,
    marginRight: 0,
    events: {
      load(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const chart = this;
        setTimeout(() => {
          if (!isNil(chart)) {
            try {
              chart.reflow();
            } catch (e) {}
          }
        }, 0);
      },
    },
  },
  colors: colors || ['#009BBD', '#FFD738', '#003032'],
  title: null,
  xAxis: {
    categories: categories,
    offset: 50,
    labels: {
      style: {
        color: '#55565B',
      },
      ...chart?.label,
    },
  },
  yAxis: {
    gridLineDashStyle: 'longdash',
    endOnTick: false,
    title: null,
    labels: {
      style: {
        color: '#55565B',
      },
      ...chart?.label,
    },
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    column: {
      stacking: 'normal',
    },
    series: {
      pointWidth: 12,
    },
  },
  legend: {
    align: 'left',
    itemMarginTop: 8,
    ...chart?.legend,
  },
  series: series,
  exporting: {
    enabled: false,
  },
});

/**
 * Formats data into Highcharts format for cashflow statement
 */
export const formatCashflowData = ({
  summary,
  reportFrequency,
  chart,
}: RVChartStatementBaseParameter): RVFormattedStatementData => {
  const categories = formatDate(summary, reportFrequency);
  const financingActivities = formatSeries(
    summary,
    Translations.FINANCING_ACTIVITIES,
    'financingActivities',
  );
  const investingActivities = formatSeries(
    summary,
    Translations.INVESTING_ACTIVITIES,
    'investingActivities',
  );
  const operatingActivities = formatSeries(
    summary,
    Translations.OPERATING_ACTIVITIES,
    'operatingActivities',
  );
  const netCash = {
    type: 'spline',
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        lineWidth: 0,
      },
    },
    enableMouseTracking: false,
    ...formatSeries(summary, Translations.NET_CASH, 'netCash'),
  };

  const series = [financingActivities, investingActivities, netCash, operatingActivities].filter(
    (seriesData) => seriesData?.data.length > 0,
  );

  return {
    categories,
    series: series as any,
    colors: chart?.colors || RAILZ_CASHFLOW_COLORS,
  };
};

/**
 * Formats data into Highcharts format for balance sheet
 */
export const formatBalanceSheetData = ({
  summary,
  reportFrequency,
  chart,
}: RVChartStatementBaseParameter): RVFormattedStatementData => {
  const categories = formatDate(summary, reportFrequency);
  const currentAssets = formatSeries(summary, Translations.CURRENT_ASSETS, 'currentAssets');
  const currentLiabilities = formatSeries(
    summary,
    Translations.CURRENT_LIABILITIES,
    'currentLiabilities',
  );
  const nonCurrentAssets = formatSeries(
    summary,
    Translations.NON_CURRENT_ASSETS,
    'nonCurrentAssets',
  );
  const nonCurrentLiabilities = formatSeries(
    summary,
    Translations.NON_CURRENT_LIABILITIES,
    'nonCurrentLiabilities',
  );

  const equity = {
    type: 'spline',
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        lineWidth: 0,
      },
    },
    enableMouseTracking: false,
    ...formatSeries(summary, Translations.EQUITY, 'equity'),
  };

  const series = [
    currentAssets,
    currentLiabilities,
    nonCurrentAssets,
    nonCurrentLiabilities,
    equity,
  ].filter((seriesData) => seriesData?.data.length > 0);

  return {
    categories,
    series: series as any,
    colors: chart?.colors || RAILZ_BALANCE_SHEET_COLORS,
  };
};

/**
 * Formats data into Highcharts format for income statement
 */
export const formatIncomeStatementData = ({
  summary,
  reportFrequency,
  chart,
}: RVChartStatementBaseParameter): RVFormattedStatementData => {
  const categories = formatDate(summary, reportFrequency);
  const costOfGoodsSold = formatSeries(summary, Translations.COST_OF_GOODS_SOLD, 'costOfGoodsSold');
  const operatingExpenses = formatSeries(
    summary,
    Translations.OPERATING_EXPENSES,
    'operatingExpenses',
  );
  const operatingIncome = formatSeries(summary, Translations.OPERATING_INCOME, 'operatingIncome');
  const otherExpenses = formatSeries(summary, Translations.OTHER_EXPENSES, 'otherExpenses');
  const otherIncome = formatSeries(summary, Translations.OTHER_INCOME, 'otherIncome');

  const netIncome = {
    type: 'spline',
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        lineWidth: 0,
      },
    },
    enableMouseTracking: false,
    ...formatSeries(summary, Translations.NET_INCOME, 'netIncome'),
  };

  const series = [
    costOfGoodsSold,
    netIncome,
    operatingExpenses,
    operatingIncome,
    otherExpenses,
    otherIncome,
  ].filter((seriesData) => seriesData?.data.length > 0);

  return {
    categories,
    series: series as any,
    colors: chart?.colors || RAILZ_INCOME_STATEMENT_COLORS,
  };
};

/**
 * Formats retrieved data into Highcharts format based on different report type
 */
export const formatData = (
  statementParameter: RVChartStatementParameter,
): RVFormattedStatementData => {
  if (statementParameter.reportType === RVReportTypes.BALANCE_SHEET)
    return formatBalanceSheetData(statementParameter);
  if (statementParameter.reportType === RVReportTypes.CASHFLOW_STATEMENTS)
    return formatCashflowData(statementParameter);
  if (statementParameter.reportType === RVReportTypes.INCOME_STATEMENTS)
    return formatIncomeStatementData(statementParameter);
};

/**
 * Make API call based on expected parameters for financial statements data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVFormattedStatementResponse> => {
  let reportData;
  try {
    const startDate = format(parseISO(filter.startDate), 'yyyy-MM-dd');
    const endDate = format(parseISO(filter.endDate), 'yyyy-MM-dd');
    let allParameters;
    if ('connectionId' in filter && filter?.connectionId) {
      allParameters = pick(
        {
          ...filter,
          startDate,
          endDate,
        },
        ['startDate', 'endDate', 'reportFrequency', 'connectionId'],
      );
    } else {
      allParameters = pick(
        {
          ...filter,
          startDate,
          endDate,
        },
        ['startDate', 'endDate', 'reportFrequency', 'businessName', 'serviceName'],
      );
    }

    reportData = await RequestServiceInstance.getReportData({
      reportType: filter.reportType,
      filter: allParameters,
    });
  } catch (error) {
    errorLog(Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA, error);
    reportData = { error };
  }
  return reportData;
};

/**
 * Checks whether we need to add reconstruct: true to the params or not
 * @param {RVStatementsFilter} filter - Current filter
 * @returns {boolean}
 */
export const shouldAddReconstructParam = (
  filter: RVBaseFilterBusinessDateFrequencyType,
): boolean => {
  const isFinancialStatement = isStatements(filter.reportType);

  return (
    isFinancialStatement &&
    ![RVAccountingProviders.ORACLE_NETSUITE, RVAccountingProviders.SAGE_INTACCT].includes(
      filter.serviceName as RVAccountingProviders,
    )
  );
};
