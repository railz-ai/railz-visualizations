import { isNil, pick } from "lodash-es";

import { format, parseISO } from "date-fns";

import Translations from "../../config/translations/en.json";
import { formatDate, formatSeries } from "../../helpers/utils";
import {
  RVChartOptionsParameter,
  RVChartStatementBaseParameter,
  RVChartStatementParameter,
  RVFormattedStatementData,
  RVFormattedStatementResponse,
  RVReportRequestParameter,
} from "../../types";
import { RVReportTypes } from "../../types/enum/report-type";
import { RequestServiceInstance } from "../../services/request";
import { errorLog } from "../../services/logger";

/**
 * Setup Highcharts options for bar charts
 */
export const getOptionsBarChart = ({
  categories,
  series,
  colors,
  chart,
}: RVChartOptionsParameter) => ({
  chart: {
    height: chart?.style?.height,
    type: "column",
    style: {
      fontFamily: [
        "Inter",
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
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
  colors: colors || ["#009BBD", "#FFD738", "#003032"],
  title: null,
  xAxis: {
    categories: categories,
    offset: 50,
    labels: {
      style: {
        color: "#55565B",
      },
    },
  },
  yAxis: {
    gridLineDashStyle: "longdash",
    endOnTick: false,
    title: null,
    labels: {
      style: {
        color: "#55565B",
      },
    },
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    column: {
      stacking: "normal",
    },
    series: {
      pointWidth: 12,
    },
  },
  legend: {
    align: "left",
    itemMarginTop: 8,
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
  colors,
}: RVChartStatementBaseParameter): RVFormattedStatementData => {
  const categories = formatDate(summary, reportFrequency);
  const financingActivities = formatSeries(
    summary,
    Translations.FINANCING_ACTIVITIES,
    "financingActivities"
  );
  const investingActivities = formatSeries(
    summary,
    Translations.INVESTING_ACTIVITIES,
    "investingActivities"
  );
  const operatingActivities = formatSeries(
    summary,
    Translations.OPERATING_ACTIVITIES,
    "operatingActivities"
  );
  const netCash = {
    type: "spline",
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        lineWidth: 0,
      },
    },
    enableMouseTracking: false,
    ...formatSeries(summary, Translations.NET_CASH, "netCash"),
  };

  const series = [
    financingActivities,
    investingActivities,
    netCash,
    operatingActivities,
  ].filter((seriesData) => seriesData?.data.length > 0);

  return {
    categories,
    series: series as any,
    colors: colors || ["#389BFF", "#FFD738", "#1D7043", "#003032"],
  };
};

/**
 * Formats data into Highcharts format for balance sheet
 */
export const formatBalanceSheetData = ({
  summary,
  reportFrequency,
  colors,
}: RVChartStatementBaseParameter): RVFormattedStatementData => {
  const categories = formatDate(summary, reportFrequency);
  const currentAssets = formatSeries(
    summary,
    Translations.CURRENT_ASSETS,
    "currentAssets"
  );
  const currentLiabilities = formatSeries(
    summary,
    Translations.CURRENT_LIABILITIES,
    "currentLiabilities"
  );
  const nonCurrentAssets = formatSeries(
    summary,
    Translations.NON_CURRENT_ASSETS,
    "nonCurrentAssets"
  );
  const nonCurrentLiabilities = formatSeries(
    summary,
    Translations.NON_CURRENT_LIABILITIES,
    "nonCurrentLiabilities"
  );

  const equity = {
    type: "spline",
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        lineWidth: 0,
      },
    },
    enableMouseTracking: false,
    ...formatSeries(summary, Translations.EQUITY, "equity"),
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
    colors: colors || ["#1D7043", "#30A665", "#F06C3A", "#B30000", "#003032"],
  };
};

/**
 * Formats data into Highcharts format for income statement
 */
export const formatIncomeStatementData = ({
  summary,
  reportFrequency,
  colors,
}: RVChartStatementBaseParameter): RVFormattedStatementData => {
  const categories = formatDate(summary, reportFrequency);
  const costOfGoodsSold = formatSeries(
    summary,
    Translations.COST_OF_GOODS_SOLD,
    "costOfGoodsSold"
  );
  const operatingExpenses = formatSeries(
    summary,
    Translations.OPERATING_EXPENSES,
    "operatingExpenses"
  );
  const operatingIncome = formatSeries(
    summary,
    Translations.OPERATING_INCOME,
    "operatingIncome"
  );
  const otherExpenses = formatSeries(
    summary,
    Translations.OTHER_EXPENSES,
    "otherExpenses"
  );
  const otherIncome = formatSeries(
    summary,
    Translations.OTHER_INCOME,
    "otherIncome"
  );

  const netIncome = {
    type: "spline",
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        lineWidth: 0,
      },
    },
    enableMouseTracking: false,
    ...formatSeries(summary, Translations.NET_INCOME, "netIncome"),
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
    colors: colors || [
      "#1D7043",
      "#FF804F",
      "#009BBD",
      "#BCEDD2",
      "#38C076",
      "#003032",
    ],
  };
};

/**
 * Formats retrieved data into Highcharts format based on different report type
 */
export const formatData = (
  statementParameter: RVChartStatementParameter
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
  configuration,
}: RVReportRequestParameter): Promise<RVFormattedStatementResponse> | never => {
  let reportData;
  try {
    let startDate;
    let endDate;
    try {
      startDate = format(parseISO(filter.startDate), "yyyy-MM-dd");
    } catch (error) {
      errorLog(Translations.ERROR_START_DATE);
      throw new Error(Translations.ERROR_OOPS);
    }
    try {
      endDate = format(parseISO(filter.endDate), "yyyy-MM-dd");
    } catch (error) {
      errorLog(Translations.ERROR_END_DATE);
      throw new Error(Translations.ERROR_OOPS);
    }
    let allParameters;
    if ("connectionId" in filter && filter?.connectionId) {
      allParameters = pick({ ...filter, startDate, endDate }, [
        "startDate",
        "endDate",
        "reportFrequency",
        "connectionId",
      ]);
    } else {
      allParameters = pick({ ...filter, startDate, endDate }, [
        "startDate",
        "endDate",
        "reportFrequency",
        "businessName",
        "serviceName",
      ]);
    }
    reportData = await RequestServiceInstance.getReportData({
      token: configuration.token,
      reportType: filter.reportType,
      filter: allParameters,
    });
  } catch (error) {
    errorLog(Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA, error);
    throw new Error(Translations.ERROR_OOPS);
  }
  return reportData;
};
