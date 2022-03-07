import { format, parseISO } from 'date-fns';

import { pick } from 'lodash-es';

import { RVFormattedTransactionResponse, RVReportRequestDateParameter } from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import Translations from '../../config/translations/en.json';

/**
 * Make API call based on expected parameters for invoices and bills data type
 */
export const getTransactionsData = async ({ filter }: RVReportRequestDateParameter): Promise<RVFormattedTransactionResponse> => {
  let reportData = {};
  try {
    const startDate = format(parseISO(filter.startDate), 'yyyy-MM-dd');
    const endDate = format(parseISO(filter.endDate), 'yyyy-MM-dd');
    let allParameters;
    if ('connectionId' in filter && filter?.connectionId) {
      allParameters = pick({ ...filter, startDate, endDate }, ['startDate', 'endDate', 'connectionId']);
    } else {
      allParameters = pick({ ...filter, startDate, endDate }, ['startDate', 'endDate', 'businessName', 'serviceName']);
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
