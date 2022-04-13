import { format, parseISO } from 'date-fns';

import { pick } from 'lodash-es';

import { RVFormattedTransactionResponse, RVReportRequestDateParameter } from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import Translations from '../../config/translations/en.json';
import { RAILZ_DATE_FORMAT } from '../../types/constants/date';

/**
 * Make API call based on expected parameters for invoices and bills data type
 */
export const getTransactionsData = async ({
  filter,
}: RVReportRequestDateParameter): Promise<RVFormattedTransactionResponse> => {
  let reportData = {};
  try {
    const startDate = format(parseISO(filter.startDate), RAILZ_DATE_FORMAT);
    const endDate = format(parseISO(filter.endDate), RAILZ_DATE_FORMAT);
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
    reportData = { error };
  }
  return reportData;
};
