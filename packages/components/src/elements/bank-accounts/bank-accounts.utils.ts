import { pick } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { RVFormattedBankAccountsResponse, RVParams, RVReportTypesUrlMapping } from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog, warnLog } from '../../services/logger';

import { RVReportRequestParameter } from './../../types/interface/summary/parameters';
import { RVAllProviders } from './../../types/enum/service-providers';

/**
 * Make API call based on expected parameters for bank account data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVFormattedBankAccountsResponse> => {
  let reportData;
  //TODO START: This should be changed when we have more banks
  if (filter.serviceName !== RVAllProviders.PLAID) {
    warnLog(Translations.RV_BANK_ACCOUNT_MUST_BE_SERVICE_NAME_PLAID);
  }
  const pickedFilter = {
    ...pick(filter, [RVParams.BUSINESS_NAME]),
    serviceName: RVAllProviders.PLAID,
  };
  //TODO END
  try {
    reportData = await RequestServiceInstance.getReportData({
      path: RVReportTypesUrlMapping[filter.reportType],
      filter: pickedFilter,
    });
  } catch (error) {
    errorLog(Translations.RV_NOT_ABLE_TO_RETRIEVE_REPORT_DATA, error);
    reportData = { error };
  }
  return reportData;
};
