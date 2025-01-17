import { pick, isNil } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import {
  RVReportRequestParameter,
  RVReportTypesUrlMapping,
  RVTaxBenchmarkingReponse,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
/**
 * Percentage change calculation, 2 decimal places
 */
export const getPercentageChange = (value1: number, value2: number): number => {
  if (isNil(value1) || isNil(value2) || value2 === 0) {
    return null;
  }

  return Math.round(((value1 - value2) / value2) * 10000) / 100;
};

/**
 * Make API call to tax benchmarking report
 */
export const getReportData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVTaxBenchmarkingReponse> => {
  let reportData;
  try {
    // industry code, region, limit, offset, orderBy
    const allParameters = pick({ ...filter }, ['industryCode', 'region', 'connectionUuid']);
    // ---temp values ----
    // allParameters.region = 'VA';
    // allParameters.industryCode = 33461;
    // allParameters.connectionUuid = 'CON-263008ad-b230-4e45-8f0c-14414bd7cc3e';
    // ----------
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
