import { pick } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { RVFormattedBankAccountsResponse, RVParams, RVReportTypesUrlMapping } from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';

import { RVReportRequestParameter } from './../../types/interface/summary/parameters';

/**
 * Make API call based on expected parameters for bank account data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVFormattedBankAccountsResponse> => {
  let reportData;
  try {
    reportData = await RequestServiceInstance.getReportData({
      path: RVReportTypesUrlMapping[filter.reportType],
      filter: pick(filter, [RVParams.SERVICE_NAME, RVParams.BUSINESS_NAME]),
    });
  } catch (error) {
    errorLog(Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA, error);
    reportData = { error };
  }
  return reportData;
};
