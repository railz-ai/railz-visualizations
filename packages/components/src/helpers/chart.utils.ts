import { compareAsc, parseISO } from 'date-fns';

import { isEmpty, isNil } from 'lodash-es';

import Translations from '../config/translations/en.json';
import { getOptionsBarChart } from '../elements/statements-chart/statements-chart.utils';
import { errorLog } from '../services/logger';
import {
  RAILZ_CHART_LABEL_COLOR,
  RAILZ_CHART_LEGEND_COLOR,
  RAILZ_TEXT_COLOR,
  RVConfiguration,
  RVFilterAll,
  RVOptions,
  RVOptionsBarStyle,
  RVReportFrequency,
  RVReportTypes,
  RVUpdateChartParameter,
  RVCreditScoreSummary,
  RVOptionsBankReconciliationStyle,
} from '../types';

import { isRequiredReportFrequency } from './utils';
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
 * @function getFilter: if filter is a string, convert to an object
 * @param filter: Filter query
 */
export const getFilter = (filter: RVFilterAll | string): RVFilterAll => {
  let formattedFilter;
  if (filter) {
    try {
      if (typeof filter === 'string') {
        formattedFilter = JSON.parse(filter);
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

export const validateRequiredParams = (filter: RVFilterAll): boolean => {
  return (
    validateBusinessServiceNameParams(filter) &&
    validateDateParams(filter) &&
    validateReportFrequencyParams(filter) &&
    // validateIndustryCodeAndRegionParams(filter) &&
    // validateAccountingMethodParams(filter) &&
    validateReportTypeParams(filter)
  );
};

export const validateIndustryCodeAndRegionParams = (filter: RVFilterAll): boolean => {
  const hasConnectionId = !isEmpty(filter?.connectionUuid);

  if (!hasConnectionId) {
    errorLog(Translations.RV_ERROR_INVALID_BUSINESS_IDENTIFICATION);
    return false;
  }
  if (isNil(filter.industryCode)) {
    errorLog(Translations.RV_TAX_BENCHMARKING_REQUIRED_FIELDS);
    return false;
  }
  if (!isNil(filter.region) && isEmpty(filter.region)) {
    delete filter.region;
  }
  return true;
};

export const validateBusinessServiceNameParams = (filter: RVFilterAll): boolean => {
  const filterPassed = filter as unknown as any;
  const hasConnectionId = !isEmpty(filterPassed?.connectionUuid);

  if (!hasConnectionId) {
    errorLog(Translations.RV_ERROR_INVALID_BUSINESS_IDENTIFICATION);
    return false;
  }
  return true;
};

export const validateDateParams = (filter: RVFilterAll): boolean => {
  const { startDate, endDate, reportType } = filter;
  if ([RVReportTypes.BANK_ACCOUNT, RVReportTypes.CREDIT_SCORE].includes(reportType)) {
    return true;
  }
  if (startDate && endDate) {
    const compare = compareAsc(parseISO(startDate), parseISO(endDate));
    if (compare >= 0) {
      errorLog(Translations.RV_END_DATE_BEFORE_START_DATE);
      return false;
    }
  } else {
    errorLog(Translations.RV_DATE_REQUIRED);
    return false;
  }
  return true;
};

export const validateReportFrequencyParams = (filter: RVFilterAll): boolean => {
  if (
    isRequiredReportFrequency(filter?.reportType) &&
    !Object.values(RVReportFrequency).includes(filter?.reportFrequency)
  ) {
    errorLog(Translations.RV_ERROR_INVALID_REPORT_FREQUENCY);
    return false;
  }
  return true;
};

// export const validateAccountingMethodParams = (filter: RVFilterAll): boolean => {
//   if (
//     isRequiredAccountingMethod(filter?.reportType) &&
//     !Object.values(RVAccountingMethod).includes(filter?.accountingMethod)
//   ) {
//     errorLog(Translations.RV_ERROR_INVALID_ACCOUNTING_METHOD);
//     return false;
//   }
//   return true;
// };

export const validateReportTypeParams = (filter: RVFilterAll): boolean => {
  if (!Object.values(RVReportTypes).includes(filter.reportType)) {
    errorLog(Translations.RV_ERROR_INVALID_REPORT_TYPE);
    return false;
  }
  return true;
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
export const getOptions = (options: RVOptions | string): RVOptions => {
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
    }
    checkAccessibilityFromOptions(formattedOptions);
  } catch (error) {
    errorLog(Translations.RV_ERROR_PARSING_OPTIONS + ' ' + JSON.stringify(error));
  }
  return formattedOptions;
};

/**
 * getData: if data is a string, convert to an object
 */
export const getData = (options: RVCreditScoreSummary | string): RVCreditScoreSummary => {
  let formattedData: RVCreditScoreSummary;
  try {
    if (options) {
      try {
        if (typeof options === 'string') {
          formattedData = JSON.parse(options);
        } else {
          formattedData = options;
        }
      } catch (error) {
        errorLog(Translations.RV_ERROR_PARSING_DATA + ' ' + JSON.stringify(error));
      }
    }
  } catch (error) {
    errorLog(Translations.RV_ERROR_PARSING_DATA + ' ' + JSON.stringify(error));
  }
  return formattedData;
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
 * getBankReconciliationOptionsStyle: if option is a string, convert to an object
 * this is used if railz-bank-reconciliation is used directly
 * @param options: Whitelabeling options
 */
export const getBankReconciliationOptionsStyle = (
  options: RVOptionsBankReconciliationStyle | string,
): RVOptionsBankReconciliationStyle | never => {
  let formattedOptionsStyle: RVOptionsBankReconciliationStyle;
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

// /**
//  * @function getContent: if configuration is a string, convert to an object
//  * Validate that configuration is present, if not, return formatted configuration as undefined
//  * @param content: Content text/info
//  * @param filter: To retrieve reportType
//  */
// export const getContent = (
//   content: RVContent | string,
//   filter?: RVAllFilter,
// ): RVContent | never => {
//   let formattedContent: RVContent;
//   if (content) {
//     try {
//       if (typeof content === 'string') {
//         formattedContent = JSON.parse(content);
//       } else {
//         formattedContent = content;
//       }
//     } catch (error) {
//       errorLog(Translations.RV_ERROR_PARSING_CONTENT + ' ' + error.message);
//     }
//   }
//   if (filter) {
//     formattedContent.title = formattedContent.title || getTitleByReportType(filter.reportType);
//   }
//   return formattedContent;
// };

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
  }

  return containerOptions;
};
