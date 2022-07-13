import { pick } from 'lodash-es';
import { format, parseISO } from 'date-fns';

import Translations from '../../config/translations/en.json';
import {
  RVFormattedScoreResponse,
  RVReportRequestParameter,
  RVReportTypesUrlMapping,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import { RAILZ_DATE_FORMAT } from '../../types/constants/date';

/**
 * Make API call based on expected parameters for score data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVFormattedScoreResponse> => {
  let reportData;
  try {
    const startDate = format(parseISO(filter.startDate), RAILZ_DATE_FORMAT);
    const endDate = format(parseISO(filter.endDate), RAILZ_DATE_FORMAT);
    const parametersToAdd =
      'connectionId' in filter && filter?.connectionId
        ? ['connectionId']
        : ['businessName', 'serviceName'];
    const allParameters = pick(
      {
        ...filter,
        startDate,
        endDate,
      },
      ['startDate', 'endDate', ...parametersToAdd],
    );

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
