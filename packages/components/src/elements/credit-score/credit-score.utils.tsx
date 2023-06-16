import { pick } from 'lodash-es';
import { format, parseISO } from 'date-fns';

import Translations from '../../config/translations/en.json';
import {
  RVFilterAll,
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
    const endDate = filter.endDate ? format(parseISO(filter.endDate), RAILZ_DATE_FORMAT) : '';
    const parametersToAdd =
      'connectionId' in filter && filter?.connectionId
        ? ['connectionId']
        : ['businessName', 'serviceName'];

    const allParameters = pick(
      {
        ...filter,
        endDate,
      },
      [endDate && 'endDate', ...parametersToAdd],
    ) as RVFilterAll;

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
