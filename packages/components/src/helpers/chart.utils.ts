import { compareAsc, parseISO } from 'date-fns';

import { isEmpty } from 'lodash-es';

import Translations from '../config/translations/en.json';
import { getOptionsBarChart } from '../elements/statements-chart/statements-chart.utils';
import { errorLog, warnLog } from '../services/logger';
import {
  RAILZ_CHART_LABEL_COLOR,
  RAILZ_CHART_LEGEND_COLOR,
  RAILZ_TEXT_COLOR,
  RVAllFilter,
  RVConfiguration,
  RVDateFilters,
  RVFilter,
  RVFilterFrequency,
  RVOptions,
  RVOptionsBarStyle,
  RVReportFrequency,
  RVReportTypes,
  RVUpdateChartParameter,
} from '../types';

import { getTitleByReportType, isRequiredReportFrequency } from './utils';
import { checkAccessibility } from './accessibility';

/**
 * @function getConfiguration: if configuration is a string, convert to an object
 * Validate that configuration is present, if not, return formatted configuration as undefined
 * @param configuration: Authentication configuration
 */
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
        errorLog(Translations.RV_TOKEN_NOT_PRESENT);
        formattedConfiguration = undefined;
      }
    } catch (error) {
      errorLog(Translations.RV_ERROR_PARSING_CONFIGURATION, error);
    }
  } else {
    errorLog(Translations.RV_CONFIGURATION_NOT_PRESENT);
  }
  return formattedConfiguration;
};

/**
 * @function parseFilter: if filter is a string, convert to an object
 * @param filter: Filter query
 */
export const parseFilter = (filter: RVFilter | string): RVFilter => {
  let formattedFilter;
  if (filter) {
    try {
      if (typeof filter === 'string') {
        formattedFilter = JSON.parse(filter);

        if (!validateBusinessParams(formattedFilter)) {
          formattedFilter = undefined;
        }
      } else {
        formattedFilter = filter;
      }
    } catch (error) {
      errorLog(Translations.RV_ERROR_PARSING_CONFIGURATION + ' ' + JSON.stringify(error));
    }
  } else {
    errorLog(Translations.RV_FILTER_NOT_PRESENT);
  }
  return formattedFilter;
};

export const validateRequiredParams = (filter: RVFilter): boolean => {
  return (
    validateReportTypeParams(filter) &&
    validateBusinessParams(filter) &&
    validateReportFrequencyParams(filter)
  );
};

export const validateBusinessParams = (filter: RVFilter): boolean => {
  const filterPassed = filter as unknown as any;
  const hasConnectionId = !isEmpty(filterPassed?.connectionId);
  const hasBusinessName = !isEmpty(filterPassed?.businessName);
  const hasServiceName = !isEmpty(filterPassed?.serviceName);
  if (hasConnectionId) {
    warnLog(Translations.RV_WARN_CONNECTION_ID_NOT_RELEASED);
  }
  if (!hasBusinessName && !hasConnectionId) {
    errorLog(Translations.RV_ERROR_INVALID_BUSINESS_IDENTIFICATION);
    return false;
  }
  if (!hasServiceName) {
    warnLog(Translations.RV_ERROR_NO_SERVICE_NAME);
    if (hasBusinessName) {
      return false;
    }
  }
  return true;
};

export const validateReportFrequencyParams = (filter: RVFilter): boolean => {
  const filterPassed = filter as unknown as RVFilterFrequency;
  if (
    isRequiredReportFrequency(filterPassed.reportType) &&
    !Object.values(RVReportFrequency).includes(filterPassed?.reportFrequency)
  ) {
    errorLog(Translations.RV_ERROR_INVALID_REPORT_FREQUENCY);
    return false;
  }
  return true;
};

export const validateReportTypeParams = (filter: RVFilter): boolean => {
  if (!Object.values(RVReportTypes).includes(filter.reportType)) {
    errorLog(Translations.RV_ERROR_INVALID_REPORT_TYPE);
    return false;
  }
  return true;
};

/**
 * @function getFilter: retrieve formatted filter
 * @param filter: Filter query
 */
export const getFilter = (filter: RVFilter | string): RVFilter => {
  return parseFilter(filter);
};

/**
 * @function getDateFilter: Compare start and end date passed and ensure
 * end date is greater than start date
 * @param filter: Filter query
 */
export const getDateFilter = (filter: RVDateFilters | string): RVDateFilters => {
  let formattedFilter = parseFilter(filter) as RVDateFilters;
  if (formattedFilter) {
    if (formattedFilter.startDate && formattedFilter.endDate) {
      try {
        const compare = compareAsc(
          parseISO(formattedFilter.startDate),
          parseISO(formattedFilter.endDate),
        );
        if (compare >= 0) {
          formattedFilter = undefined;
          errorLog(Translations.RV_END_DATE_BEFORE_START_DATE);
        }
      } catch (error) {
        errorLog(Translations.RV_DATE_DIFF_ERROR);
        throw new Error(Translations.ERROR_500_TITLE);
      }
    }
  }
  return formattedFilter;
};

/**
 * @function checkAccessibilityFromOptions:
 * Check if options passed are accessibility friendly
 * @param options: Whitelabeling options
 */
export const checkAccessibilityFromOptions = (options: RVOptions): void => {
  try {
    if (options?.container?.style?.backgroundColor || options?.container?.style?.background) {
      if (options?.title?.style?.color) {
        checkAccessibility(
          options?.container?.style?.backgroundColor || options?.container?.style?.background,
          options?.title?.style?.color || RAILZ_TEXT_COLOR,
          Translations.RV_ACCESSIBILITY_CONTAINER_TITLE,
        );
      }
      checkAccessibility(
        options?.container?.style?.backgroundColor || options?.container?.style?.background,
        options?.loadingIndicator?.textStyle?.color || RAILZ_CHART_LABEL_COLOR,
        Translations.RV_ACCESSIBILITY_CHART_LOADING_INDICATOR,
      );
      checkAccessibility(
        options?.container?.style?.backgroundColor || options?.container?.style?.background,
        options?.errorIndicator?.textStyle?.color || RAILZ_CHART_LABEL_COLOR,
        Translations.RV_ACCESSIBILITY_CHART_ERROR_INDICATOR,
      );
    }
    if (options?.chart?.backgroundColor) {
      if (options?.chart?.label?.style?.color) {
        checkAccessibility(
          options?.chart?.backgroundColor,
          options?.chart?.label?.style?.color || RAILZ_CHART_LABEL_COLOR,
          Translations.RV_ACCESSIBILITY_CHART_LABEL,
        );
      }
      if (options?.chart?.legend?.style?.color) {
        checkAccessibility(
          options?.chart?.backgroundColor,
          options?.chart?.legend?.style?.color || RAILZ_CHART_LEGEND_COLOR,
          Translations.RV_ACCESSIBILITY_CHART_LEGEND,
        );
      }
    }
  } catch (e) {
    errorLog(Translations.RV_ACCESSIBILITY_CHECK_FAILED, e);
  }
};

/**
 * getOptions: if option is a string, convert to an object
 * and check if options are accessible
 * @param options: Whitelabeling options
 * @param filter: Filter query
 */
export const getOptions = (options: RVOptions | string, filter?: RVAllFilter): RVOptions => {
  let formattedOptions: RVOptions;
  try {
    if (options) {
      try {
        if (typeof options === 'string') {
          formattedOptions = JSON.parse(options);
        } else {
          formattedOptions = options;
        }
      } catch (error) {
        errorLog(Translations.RV_ERROR_PARSING_OPTIONS + ' ' + JSON.stringify(error));
      }
    } else {
      formattedOptions = { title: { text: '' } };
    }
    if (filter) {
      if (formattedOptions?.title) {
        if (!formattedOptions.title.text) {
          formattedOptions.title.text = getTitleByReportType(filter.reportType);
        }
      } else if (formattedOptions) {
        formattedOptions = {
          ...formattedOptions,
          title: { text: getTitleByReportType(filter.reportType) },
        };
      } else {
        formattedOptions = { title: { text: getTitleByReportType(filter.reportType) } };
      }
    }
    checkAccessibilityFromOptions(formattedOptions);
  } catch (error) {
    errorLog(Translations.RV_ERROR_PARSING_OPTIONS + ' ' + JSON.stringify(error));
  }
  return formattedOptions;
};

/**
 * getBarOptionsStyle: if option is a string, convert to an object
 * this is used if railz-progress-bar is used directly
 * @param options: Whitelabeling options
 */
export const getBarOptionsStyle = (
  options: RVOptionsBarStyle | string,
): RVOptionsBarStyle | never => {
  let formattedOptionsStyle: RVOptionsBarStyle;
  if (options) {
    try {
      if (typeof options === 'string') {
        formattedOptionsStyle = JSON.parse(options);
      } else {
        formattedOptionsStyle = options;
      }
    } catch (error) {
      errorLog(Translations.RV_ERROR_PARSING_CONFIGURATION + ' ' + JSON.stringify(error));
    }
  } else {
    formattedOptionsStyle = {};
  }
  return formattedOptionsStyle;
};

/**
 * getHighchartsParams: Combine generic stacked bar line chart
 * options and formatted data based on a given report type
 * into one option for highcharts usage
 * @param dataFormatted: formatted highchart data based on report type
 * @param options: Whitelabeling options
 */
export const getHighchartsParams = ({
  dataFormatted,
  options,
}: RVUpdateChartParameter): any | never => {
  let containerOptions;
  try {
    containerOptions = getOptionsBarChart({
      ...dataFormatted,
      chart: options?.chart,
    });
  } catch (error) {
    errorLog(Translations.RV_NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    throw new Error(Translations.ERROR_500_TITLE);
  }

  return containerOptions;
};
