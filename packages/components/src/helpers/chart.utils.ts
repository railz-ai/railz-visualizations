import { compareAsc, parseISO } from 'date-fns';

import Translations from '../config/translations/en.json';
import { getOptionsBarChart } from '../components/statements-chart/statements-chart.utils';
import { errorLog } from '../services/logger';
import { RVAllFilter, RVConfiguration, RVDateFilters, RVFilter, RVOptions, RVUpdateChartParameter } from '../types';

import { getTitleByReportType } from './utils';

export const getConfiguration = (configuration: RVConfiguration | string): RVConfiguration => {
  let formattedConfiguration;
  if (configuration) {
    try {
      if (typeof configuration === 'string') {
        formattedConfiguration = JSON.parse(configuration);
      } else {
        formattedConfiguration = configuration;
      }
      if (!formattedConfiguration?.token) {
        errorLog(Translations.TOKEN_NOT_PRESENT);
        formattedConfiguration = undefined;
      }
    } catch (error) {
      errorLog(Translations.ERROR_PARSING_CONFIGURATION, error);
    }
  } else {
    errorLog(Translations.CONFIGURATION_NOT_PRESENT);
  }
  return formattedConfiguration;
};

export const parseFilter = (filter: RVFilter | string): RVFilter => {
  let formattedFilter;
  if (filter) {
    try {
      if (typeof filter === 'string') {
        formattedFilter = JSON.parse(filter);
      } else {
        formattedFilter = filter;
      }
    } catch (error) {
      errorLog(Translations.ERROR_PARSING_CONFIGURATION + ' ' + JSON.stringify(error));
    }
  } else {
    errorLog(Translations.FILTER_NOT_PRESENT);
  }
  return formattedFilter;
};

export const getFilter = (filter: RVFilter | string): RVFilter => {
  return parseFilter(filter);
};

export const getDateFilter = (filter: RVDateFilters | string): RVDateFilters => {
  let formattedFilter = parseFilter(filter) as RVDateFilters;
  if (formattedFilter) {
    if (formattedFilter.startDate && formattedFilter.endDate) {
      const compare = compareAsc(parseISO(formattedFilter.startDate), parseISO(formattedFilter.endDate));
      if (compare >= 0) {
        formattedFilter = undefined;
        errorLog(Translations.END_DATE_BEFORE_START_DATE);
      }
    }
  }
  return formattedFilter;
};

export const getOptions = (options: RVOptions | string, filter?: RVAllFilter): RVOptions => {
  let formattedOptions: RVOptions;
  if (options) {
    try {
      if (typeof options === 'string') {
        formattedOptions = JSON.parse(options);
      } else {
        formattedOptions = options;
      }
    } catch (error) {
      errorLog(Translations.ERROR_PARSING_CONFIGURATION + ' ' + JSON.stringify(error));
    }
  } else {
    formattedOptions = { title: { text: '' } };
  }
  if (filter) {
    formattedOptions.title.text = getTitleByReportType(filter.reportType);
  }
  return formattedOptions;
};

export const getHighchartsParams = ({ dataFormatted, options }: RVUpdateChartParameter): any => {
  let containerOptions;
  try {
    containerOptions = getOptionsBarChart({
      categories: dataFormatted?.categories,
      series: dataFormatted?.series,
      chart: options?.chart,
    });
  } catch (error) {
    errorLog(Translations.NOT_ABLE_TO_PARSE_REPORT_DATA, error);
  }

  return containerOptions;
};
