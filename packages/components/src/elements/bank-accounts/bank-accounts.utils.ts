import { pick } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import {
  RVFormattedBankAccountsResponse,
  RVParams,
  RVReportRequestDateParameter,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';

/**
 * Make API call based on expected parameters for bank account data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestDateParameter): Promise<RVFormattedBankAccountsResponse> => {
  let reportData;
  try {
    reportData = await RequestServiceInstance.getReportData({
      reportType: filter.reportType,
      filter: pick(filter, [RVParams.SERVICE_NAME, RVParams.BUSINESS_NAME]),
    });
  } catch (error) {
    errorLog(Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA, error);
    reportData = { error };
  }
  return reportData;
};
