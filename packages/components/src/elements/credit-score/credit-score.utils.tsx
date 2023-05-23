import { pick } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import {
  RVFormattedScoreResponse,
  RVReportRequestParameter,
  RVReportTypesUrlMapping,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';

/**
 * Make API call based on expected parameters for score data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVFormattedScoreResponse> => {
  let reportData;
  try {
    const parametersToAdd =
      'connectionId' in filter && filter?.connectionId
        ? ['connectionId']
        : ['businessName', 'serviceName'];
    const allParameters = pick(filter, parametersToAdd);

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
