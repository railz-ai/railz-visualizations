import { pick } from 'lodash-es';
import { format, parseISO } from 'date-fns';

import Translations from '../../config/translations/en.json';
import {
  RVBankReconciliation,
  RVReportRequestParameter,
  RVReportTypesUrlMapping,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import { RAILZ_DATE_FORMAT } from '../../types/constants/date';

export const formatReconciliatedData = (data: RVBankReconciliation): any => {
  let matchedItems = 0;
  let unmatchedItems = 0;
  let bankTransactionsValue = 0;
  let accountingTransactionsValue = 0;
  let reconciledTransactionsAbsValue = 0;
  if (data?.reports) {
    for (const reportItem of data.reports) {
      for (const dataItem of reportItem.data) {
        bankTransactionsValue += dataItem.bankTransactionsTotalValue
          ? dataItem.bankTransactionsTotalValue
          : 0;
        accountingTransactionsValue += dataItem.accountingTransactionsTotalValue
          ? dataItem.accountingTransactionsTotalValue
          : 0;
        if (dataItem['unreconciledBankTransactions']) {
          unmatchedItems += dataItem['unreconciledBankTransactions'].length;
        }

        if (dataItem['reconciledBankTransactions']) {
          for (const transaction of dataItem['reconciledBankTransactions']) {
            matchedItems++;
            reconciledTransactionsAbsValue += Math.abs(transaction.amount);
          }
        }
      }
    }
  }
  return {
    accuracyScore: Math.round((reconciledTransactionsAbsValue / bankTransactionsValue) * 100),
    bankBalance: bankTransactionsValue,
    accountingBalance: accountingTransactionsValue,
    matchedTransactions: matchedItems,
    totalTransations: unmatchedItems + matchedItems,
  };
};

/**
 * Make API call based on expected parameters for score data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVBankReconciliation> => {
  let reportData;
  try {
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
    const allParameters = pick({ ...filter, startDate, endDate }, [
      'startDate',
      'endDate',
      'businessName',
      'serviceName',
    ]);
    allParameters.offset = 0;
    allParameters.limit = 100;
    allParameters.orderBy = '-date';

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
