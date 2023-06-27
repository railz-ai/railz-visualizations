import { pick } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { RVFormattedBankAccountsResponse, RVParams, RVReportTypesUrlMapping } from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';

import { RVReportRequestParameter } from './../../types/interface/summary/parameters';
import { RVAllProviders } from './../../types/enum/service-providers';

/**
 * Make API call based on expected parameters for table account data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVFormattedBankAccountsResponse> => {
  let reportData;
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
