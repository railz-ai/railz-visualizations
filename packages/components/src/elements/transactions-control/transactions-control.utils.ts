import { format, parseISO } from 'date-fns';

import { pick } from 'lodash-es';

import {
  RVFormattedTransactionResponse,
  RVReportRequestParameter,
  RVReportTypesUrlMapping,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import Translations from '../../config/translations/en.json';
import { RAILZ_DATE_FORMAT } from '../../types/constants/date';

/**
 * Make API call based on expected parameters for invoices and bills data type
 */
export const getTransactionsData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVFormattedTransactionResponse> => {
  let reportData = {};
  let startDate;
  let endDate;
  try {
    startDate = format(parseISO(filter.startDate), RAILZ_DATE_FORMAT);
  } catch (error) {
    errorLog(Translations.RV_ERROR_START_DATE);
  }
  try {
    endDate = format(parseISO(filter.endDate), RAILZ_DATE_FORMAT);
  } catch (error) {
    errorLog(Translations.RV_ERROR_END_DATE);
  }
  try {
    let allParameters;
    if ('connectionId' in filter && filter?.connectionId) {
      allParameters = pick({ ...filter, startDate, endDate }, [
        'startDate',
        'endDate',
        'connectionId',
      ]);
    } else {
      allParameters = pick({ ...filter, startDate, endDate }, [
        'startDate',
        'endDate',
        'businessName',
        'serviceName',
      ]);
    }
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
