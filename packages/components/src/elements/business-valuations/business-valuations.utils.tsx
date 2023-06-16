import { pick, isNil } from 'lodash-es';
import { format, parseISO } from 'date-fns';

import Translations from '../../config/translations/en.json';
import {
  RVBusinessValuations,
  RVReportRequestParameter,
  RVReportTypesUrlMapping,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import { RAILZ_DATE_FORMAT } from '../../types/constants/date';

/**
 * Percentage change calculation, 2 decimal places
 */
const getPercentageChange = (value1: number, value2: number): number => {
  if (isNil(value1) || isNil(value2) || value2 === 0) {
    return null;
  }

  return Math.round(((value1 - value2) / value2) * 10000) / 100;
};

export const getBusinessValuationsParams = (data: RVBusinessValuations): any => {
  let liquidation = null;
  let discountedCashflow = null;
  let multipleToRevenue = null;
  let firstChicago = null;
  let liquidationPercentageChange = null;
  let discountedCashflowPercentageChange = null;
  let multipleToRevenuePercentageChange = null;
  let firstChicagoPercentageChange = null;
  let latestEndDate = null;
  if (data?.reports) {
    const reports = data.reports;

    if (data?.reports.length >= 1) {
      // get latest report data
      latestEndDate = reports[0].meta.updatedAt;
      liquidation = reports[0].data.liquidationValue;
      discountedCashflow = reports[0].data.discountedCashflowValue;
      multipleToRevenue = reports[0].data.multipleToRevenueValue;
      firstChicago = reports[0].data.firstChicagoValue;
    }

    if (data?.reports.length >= 2) {
      // liquidation percentage change over two reports
      const liquidation2 = reports[1]?.data.liquidationValue;
      liquidationPercentageChange = getPercentageChange(liquidation, liquidation2);
      // discountedCashflow percentage change over two reports
      const discountedCashflow2 = reports[1].data.discountedCashflowValue;
      discountedCashflowPercentageChange = getPercentageChange(
        discountedCashflow,
        discountedCashflow2,
      );
      // multipleToRevenue percentage change over two reports
      const multipleToRevenue2 = reports[1].data.multipleToRevenueValue;
      multipleToRevenuePercentageChange = getPercentageChange(
        multipleToRevenue,
        multipleToRevenue2,
      );
      // firstChicago percentage change over two reports
      const firstChicago2 = reports[1].data.firstChicagoValue;
      firstChicagoPercentageChange = getPercentageChange(firstChicago, firstChicago2);
    }
  }
  return {
    liquidation,
    discountedCashflow,
    multipleToRevenue,
    firstChicago,
    liquidationPercentageChange,
    discountedCashflowPercentageChange,
    multipleToRevenuePercentageChange,
    firstChicagoPercentageChange,
    latestEndDate,
  };
};

/**
 * Make API call to business valuations report
 */
export const getReportData = async ({
  filter,
}: RVReportRequestParameter): Promise<RVBusinessValuations> => {
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
    allParameters.orderBy = '-endDate';

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
