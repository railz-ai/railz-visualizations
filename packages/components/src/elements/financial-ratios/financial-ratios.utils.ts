import { pick } from 'lodash-es';
import { format, parseISO } from 'date-fns';

import Translations from '../../config/translations/en.json';
import {
  RVFormattedFinancialRatioResponse,
  RVParams,
  RVReportRequestDateParameter,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import { RAILZ_DATE_FORMAT } from '../../types/constants/date';

/**
 * Make API call based on expected parameters for financial ratio data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestDateParameter): Promise<RVFormattedFinancialRatioResponse> => {
  let reportData;
  try {
    const startDate = format(parseISO(filter.startDate), RAILZ_DATE_FORMAT);
    const endDate = format(parseISO(filter.endDate), RAILZ_DATE_FORMAT);
    const parametersToAdd =
      RVParams.CONNECTION_ID in filter && filter?.connectionId
        ? [RVParams.CONNECTION_ID]
        : [RVParams.BUSINESS_NAME, RVParams.SERVICE_NAME];
    const allParameters = pick(
      {
        ...filter,
        startDate,
        endDate,
      },
      [RVParams.START_DATE, RVParams.END_DATE, RVParams.REPORT_FREQUENCY, ...parametersToAdd],
    );

    reportData = await RequestServiceInstance.getReportData({
      reportType: filter.reportType,
      filter: allParameters,
    });
  } catch (error) {
    errorLog(Translations.RV_NOT_ABLE_TO_RETRIEVE_REPORT_DATA, error);
    reportData = { error };
  }
  return reportData;
};
