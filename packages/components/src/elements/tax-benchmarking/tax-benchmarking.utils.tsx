import { pick, isNil } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import {
  RVReportRequestParameter,
  RVReportTypesUrlMapping,
  RVTaxBenchmarkingReponse,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
/**
 * Percentage change calculation, 2 decimal places
 */
export const getPercentageChange = (value1: number, value2: number): number => {
  if (isNil(value1) || isNil(value2) || value2 === 0) {
    return null;
  }

  return Math.round(((value1 - value2) / value2) * 10000) / 100;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const fullMonthName = MONTHS[date.getMonth()];
  const formattedDate = `${fullMonthName} ${date.getDate()}, ${date.getFullYear()}`;

  return formattedDate;
};

/**
 * Make API call to tax benchmarking report
 */
export const getReportData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVTaxBenchmarkingReponse> => {
  let reportData;
  try {
    const allParameters = pick({ ...filter }, ['industryCode', 'region', 'connectionUuid']);
    if (isNil(allParameters?.region)) delete allParameters?.region;
    reportData = await RequestServiceInstance.getReportData({
      path: RVReportTypesUrlMapping[filter.reportType],
      filter: allParameters,
    });
  } catch (error) {
    errorLog(Translations.RV_NOT_ABLE_TO_RETRIEVE_REPORT_DATA, error);
    reportData = { error };
  }
  return reportData;
};
