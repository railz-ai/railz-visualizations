import { isNil } from 'lodash';
import { parseISO, format } from 'date-fns';
import Translations from '../assets/en.json';

export const getOptions = ({ categories, series, colors }) => ({
  chart: {
    type: 'column',
    style: {
      fontFamily: [
        'Inter',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
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
  },
  series: series,
});

export const formatData = (summary, reportFrequency) => {
  const categories = formattedDate(summary, reportFrequency);
  const currentAssets = formatSeries(summary, Translations.CURRENT_ASSETS, 'currentAssets');
  const currentLiabilities = formatSeries(summary, Translations.CURRENT_LIABILITIES, 'currentLiabilities');
  const nonCurrentAssets = formatSeries(summary, Translations.NON_CURRENT_ASSETS, 'nonCurrentAssets');
  const nonCurrentLiabilities = formatSeries(summary, Translations.NON_CURRENT_LIABILITIES, 'nonCurrentLiabilities');
  const assets = formatSeries(summary, Translations.ASSETS, 'assets');
  const liabilities = formatSeries(summary, Translations.LIABILITIES, 'liabilities');
  const costOfGoodsSold = formatSeries(summary, Translations.COST_OF_GOODS_SOLD, 'costOfGoodsSold');
  const netIncome = formatSeries(summary, Translations.NET_INCOME, 'netIncome');
  const operatingExpenses = formatSeries(summary, Translations.OPERATING_EXPENSES, 'operatingExpenses');
  const operatingIncome = formatSeries(summary, Translations.OPERATING_INCOME, 'operatingIncome');
  const otherExpenses = formatSeries(summary, Translations.OTHER_EXPENSES, 'otherExpenses');
  const otherIncome = formatSeries(summary, Translations.OTHER_INCOME, 'otherIncome');

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
    assets,
    liabilities,
    equity,
    costOfGoodsSold,
    netIncome,
    operatingExpenses,
    operatingIncome,
    otherExpenses,
    otherIncome,
  ].filter(seriesData => seriesData?.data.length > 0);

  return {
    categories,
    series,
    colors: ['#1D7043', '#F06C3A', '#003032', '#389BFF', '#FFD738', '#30A665', '#B30000'],
  };
};

export const formattedDate = (summary, reportFrequency): void => {
  return summary.map(data => {
    const date = parseISO(data.period.date);
    if (reportFrequency === 'quarter') return `Q${data.period.quarter} ${format(date, 'YYYY')}`;
    if (reportFrequency === 'year') return data.period.year.toString();
    return format(date, 'MMM yy');
  });
};

export const formatSeries = (summary, name, field) => ({
  name,
  data: summary.map(data => data[field]).filter(data => data != undefined),
});
