import { compareAsc, parseISO } from "date-fns";
import { isEmpty } from "lodash-es";

import Translations from "../config/translations/en.json";
import { getOptionsBarChart } from "../components/statements-chart/statements-chart.utils";
import { errorLog } from "../services/logger";
import {
  RVAllFilter,
  RVConfiguration,
  RVDateFilters,
  RVFilter,
  RVOptions,
  RVContent,
  RVUpdateChartParameter,
  RVReportFrequency,
  RVReportTypes,
} from "../types";

import { getTitleByReportType, isRequiredReportFrequency } from "./utils";

export const getConfiguration = (
  configuration: RVConfiguration | string
): RVConfiguration | never => {
  let formattedConfiguration;
  if (configuration) {
    try {
      if (typeof configuration === "string") {
        formattedConfiguration = JSON.parse(configuration);
      } else {
        formattedConfiguration = configuration;
      }
      if (!formattedConfiguration?.token) {
        errorLog(Translations.TOKEN_NOT_PRESENT);
        throw new Error(Translations.ERROR_OOPS);
      }
    } catch (error) {
      errorLog(Translations.ERROR_PARSING_CONFIGURATION, error);
      throw new Error(Translations.ERROR_OOPS);
    }
  } else {
    errorLog(Translations.CONFIGURATION_NOT_PRESENT);
    throw new Error(Translations.ERROR_OOPS);
  }
  return formattedConfiguration;
};

export const parseFilter = (filter: RVFilter | string): RVFilter | never => {
  let formattedFilter: RVFilter;
  if (filter) {
    try {
      if (typeof filter === "string") {
        formattedFilter = JSON.parse(filter);
      } else {
        formattedFilter = filter;
      }
      validateRequiredParams(formattedFilter);
    } catch (error) {
      errorLog(Translations.ERROR_PARSING_FILTER + " " + error.message);
      throw new Error(Translations.ERROR_OOPS);
    }
  } else {
    errorLog(Translations.FILTER_NOT_PRESENT);
    throw new Error(Translations.ERROR_OOPS);
  }
  return formattedFilter;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validateRequiredParams = (filter): void | never => {
  validateReportTypeParams(filter);
  validateBusinessParams(filter);
  validateReportFrequencyParams(filter);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validateBusinessParams = (filter): void | never => {
  if (
    !(!isEmpty(filter.businessName) && !isEmpty(filter.serviceName)) ||
    !isEmpty(filter.connectionId)
  ) {
    errorLog(Translations.ERROR_INVALID_BUSINESS_IDENTIFICATION);
    throw new Error(Translations.ERROR_OOPS);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validateReportFrequencyParams = (filter): void | never => {
  if (
    isRequiredReportFrequency(filter.reportType) &&
    !Object.values(RVReportFrequency).includes(filter.reportFrequency)
  ) {
    errorLog(Translations.ERROR_INVALID_REPORT_FREQUENCY);
    throw new Error(Translations.ERROR_OOPS);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validateReportTypeParams = (filter): void | never => {
  if (!Object.values(RVReportTypes).includes(filter.reportType)) {
    errorLog(Translations.ERROR_INVALID_REPORT_TYPE);
    throw new Error(Translations.ERROR_OOPS);
  }
};

export const getFilter = (filter: RVFilter | string): RVFilter => {
  return parseFilter(filter);
};

export const getDateFilter = (
  filter: RVDateFilters | string
): RVDateFilters | never => {
  const formattedFilter = parseFilter(filter) as RVDateFilters;
  if (formattedFilter) {
    if (formattedFilter.startDate && formattedFilter.endDate) {
      let startDate;
      let endDate;
      try {
        startDate = parseISO(formattedFilter.startDate);
      } catch (error) {
        errorLog(Translations.ERROR_START_DATE);
        throw new Error(Translations.ERROR_OOPS);
      }
      try {
        endDate = parseISO(formattedFilter.endDate);
      } catch (error) {
        errorLog(Translations.ERROR_END_DATE);
        throw new Error(Translations.ERROR_OOPS);
      }
      const compare = compareAsc(startDate, endDate);
      if (compare >= 0) {
        errorLog(Translations.END_DATE_BEFORE_START_DATE);
        throw new Error(Translations.ERROR_OOPS);
      }
    }
  }
  return formattedFilter;
};

export const getOptions = (options: RVOptions | string): RVOptions | never => {
  let formattedOptions: RVOptions;
  if (options) {
    try {
      if (typeof options === "string") {
        formattedOptions = JSON.parse(options);
      } else {
        formattedOptions = options;
      }
    } catch (error) {
      errorLog(Translations.ERROR_PARSING_OPTIONS + " " + error.message);
      throw new Error(Translations.ERROR_OOPS);
    }
  }
  return formattedOptions;
};
export const getContent = (
  content: RVContent | string,
  filter?: RVAllFilter
): RVContent | never => {
  let formattedContent: RVContent;
  if (content) {
    try {
      if (typeof content === "string") {
        formattedContent = JSON.parse(content);
      } else {
        formattedContent = content;
      }
    } catch (error) {
      errorLog(Translations.ERROR_PARSING_CONTENT + " " + error.message);
      throw new Error(Translations.ERROR_OOPS);
    }
  }
  if (filter) {
    formattedContent = {
      ...formattedContent,
      title: formattedContent.title || getTitleByReportType(filter.reportType),
    };
  }
  return formattedContent;
};

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
    errorLog(Translations.NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    throw new Error(Translations.ERROR_OOPS);
  }

  return containerOptions;
};
