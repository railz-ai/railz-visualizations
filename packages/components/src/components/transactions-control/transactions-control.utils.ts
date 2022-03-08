import { format, parseISO } from 'date-fns';

import { pick } from 'lodash-es';

import { RVFormattedTransactionResponse, RVReportRequestDateParameter } from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import Translations from '../../config/translations/en.json';

/**
 * Make API call based on expected parameters for invoices and bills data type
 */
export const getTransactionsData = async ({
  filter,
}: RVReportRequestDateParameter): Promise<RVFormattedTransactionResponse> => {
  let reportData = {};
  let startDate;
  let endDate;
  try {
    startDate = format(parseISO(filter.startDate), 'yyyy-MM-dd');
  } catch (error) {
    errorLog(Translations.ERROR_START_DATE);
    throw new Error(Translations.ERROR_500_TITLE);
  }
  try {
    endDate = format(parseISO(filter.endDate), 'yyyy-MM-dd');
  } catch (error) {
    errorLog(Translations.ERROR_END_DATE);
    throw new Error(Translations.ERROR_500_TITLE);
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
      reportType: filter.reportType,
      filter: allParameters,
    });
  } catch (error) {
    errorLog(Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA, error);
    throw new Error(Translations.ERROR_500_TITLE);
  }
  return reportData;
};
