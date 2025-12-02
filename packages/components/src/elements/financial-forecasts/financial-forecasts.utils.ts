import { isNil, pick } from 'lodash-es';

import { format, parseISO, startOfMonth, subDays } from 'date-fns';

import Translations from '../../config/translations/en.json';
import { formatDate, formatSeries, isStatements } from '../../helpers/utils';
import {
  ALL_FONTS,
  RAILZ_BALANCE_SHEET_COLORS,
  RAILZ_CASHFLOW_COLORS,
  RAILZ_INCOME_STATEMENT_COLORS,
  RVChartOptionsParameter,
  RVChartStatementBaseParameter,
  RVChartStatementParameter,
  RVErrorResponse,
  RVFilterStatements,
  RVFormattedStatementData,
  RVFormattedStatementResponse,
  RVReportRequestParameter,
} from '../../types';
import { RVReportTypes, RVReportTypesUrlMapping } from '../../types/enum/report-type';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import { RAILZ_DATE_FORMAT } from '../../types/constants/date';

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
      ...chart?.style,
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
  colors: colors || ['#3BCFF0', '#FFED8C', '#003032'],
  title: null,
  xAxis: {
    categories: categories,
    offset: 50,
    labels: {
      style: {
        color: '#55565B',
        ...chart?.label,
      },
    },
    ...chart?.xAxisStyle,
  },
  yAxis: {
    gridLineDashStyle: 'longdash',
    endOnTick: false,
    title: null,
    labels: {
      style: {
        color: '#55565B',
        ...chart?.label,
      },
    },
    ...chart?.yAxisStyle,
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
  date,
}: RVChartStatementBaseParameter): RVFormattedStatementData => {
  const categories = formatDate(summary, reportFrequency, date);
  const financingActivities = formatSeries(
    summary,
    Translations.RV_FINANCING_ACTIVITIES,
    'financingActivities',
  );
  const investingActivities = formatSeries(
    summary,
    Translations.RV_INVESTING_ACTIVITIES,
    'investingActivities',
  );
  const operatingActivities = formatSeries(
    summary,
    Translations.RV_OPERATING_ACTIVITIES,
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
    ...formatSeries(summary, Translations.RV_NET_CASH, 'netCash'),
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
  date,
}: RVChartStatementBaseParameter): RVFormattedStatementData => {
  const categories = formatDate(summary, reportFrequency, date);
  const currentAssets = formatSeries(summary, Translations.RV_CURRENT_ASSETS, 'currentAssets');
  const currentLiabilities = formatSeries(
    summary,
    Translations.RV_CURRENT_LIABILITIES,
    'currentLiabilities',
  );
  const nonCurrentAssets = formatSeries(
    summary,
    Translations.RV_NON_CURRENT_ASSETS,
    'nonCurrentAssets',
  );
  const nonCurrentLiabilities = formatSeries(
    summary,
    Translations.RV_NON_CURRENT_LIABILITIES,
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
    ...formatSeries(summary, Translations.RV_EQUITY, 'equity'),
  };

  const series = [
    currentAssets,
    currentLiabilities,
    nonCurrentAssets,
    nonCurrentLiabilities,
    equity,
  ].filter((seriesData) => seriesData?.data.length > 0);

  const formattedData = {
    categories,
    series: series as any,
    colors: chart?.colors || RAILZ_BALANCE_SHEET_COLORS,
  };

  return formattedData;
};

/**
 * Formats data into Highcharts format for income statement
 */
export const formatIncomeStatementData = ({
  summary,
  reportFrequency,
  chart,
  date,
}: RVChartStatementBaseParameter): RVFormattedStatementData => {
  const categories = formatDate(summary, reportFrequency, date);
  const costOfGoodsSold = formatSeries(
    summary,
    Translations.RV_COST_OF_GOODS_SOLD,
    'costOfGoodsSold',
  );
  const operatingExpenses = formatSeries(
    summary,
    Translations.RV_OPERATING_EXPENSES,
    'operatingExpenses',
  );
  const operatingIncome = formatSeries(
    summary,
    Translations.RV_OPERATING_INCOME,
    'operatingIncome',
  );
  const otherExpenses = formatSeries(summary, Translations.RV_OTHER_EXPENSES, 'otherExpenses');
  const otherIncome = formatSeries(summary, Translations.RV_OTHER_INCOME, 'otherIncome');

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
    ...formatSeries(summary, Translations.RV_NET_INCOME, 'netIncome'),
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
}: RVReportRequestParameter): Promise<{
  error?: RVErrorResponse;
  reportDataHistorical: RVFormattedStatementResponse;
  reportDataForecasted: RVFormattedStatementResponse;
}> => {
  let reportData, reportDataHistorical, reportDataForecasted;
  try {
    const startDate = format(parseISO(filter.startDate), RAILZ_DATE_FORMAT);
    const endDate = format(parseISO(filter.endDate), RAILZ_DATE_FORMAT);
    const dataParams = pick(
      {
        ...filter,
        startDate,
        endDate,
      },
      ['startDate', 'endDate', 'reportFrequency', 'connectionUuid'],
    );
    // Compute beginning of current month as both Date and formatted string for safe comparisons and API params
    const beginningOfCurrentMonth = format(startOfMonth(new Date()), RAILZ_DATE_FORMAT);
  

    const historicalDataParams = {
      ...dataParams,
      // Use the earlier of the provided startDate and the beginning of the current month
      // Set end date to the beginning of the current month
      endDate: beginningOfCurrentMonth,
    };

    reportDataHistorical = await RequestServiceInstance.getReportData({
      path: RVReportTypesUrlMapping[filter.financialStatementType],
      filter: historicalDataParams,
    });

    reportDataForecasted = await RequestServiceInstance.getReportData({
      path: RVReportTypesUrlMapping[filter.reportType],
      filter: {
        ...dataParams,
        startDate: beginningOfCurrentMonth,
        financialStatementType: filter.financialStatementType,
        percentile: filter?.percentile,
        macro: 'fis-reconstruct',
      },
    });
    reportData = { reportDataHistorical, reportDataForecasted };
  } catch (error) {
    errorLog(Translations.RV_NOT_ABLE_TO_RETRIEVE_REPORT_DATA, error);
    reportData = { error };
  }
  return reportData;
};

export const combineHistoricalAndForecastedData = (
  historicalData: RVFormattedStatementData,
  forecastedData: RVFormattedStatementData,
): RVFormattedStatementData => {
  // if either historical or forecasted data is missing, return the other one
  if (!historicalData?.series || historicalData?.series.length === 0) {
    return forecastedData;
  }
  if (!forecastedData?.series || forecastedData?.series.length === 0) {
    return historicalData;
  }

  const combinedCategories = [...historicalData?.categories, ...forecastedData?.categories];
  const combinedSeries = historicalData?.series.map((historicalSeries) => {
    const matchingForecastedSeries = forecastedData.series.find(
      (forecastedSeries) => forecastedSeries.name === historicalSeries.name,
    );
    if (matchingForecastedSeries) {
      return {
        ...historicalSeries,
        name: historicalSeries.name,
        data: [...historicalSeries.data, ...matchingForecastedSeries.data],
      };
    }
  });

  const dataFormatted = {
    categories: combinedCategories,
    series: combinedSeries,
    colors: historicalData.colors,
    xPlotLineValue: historicalData.categories.length,
  };

  return dataFormatted;
};

/**
 * Checks whether we need to add reconstruct: true to the params or not
 * @param {RVStatementsFilter} filter - Current filter
 * @returns {boolean}
 */
export const shouldAddReconstructParam = (filter: RVFilterStatements): boolean => {
  return isStatements(filter.reportType);
};
