import {
  RVFilterBankReconciliation,
  RVFormattedScoreResponse,
  RVFormattedTransactionResponse,
  RVReportRequest,
  RVReportRequestParameter,
  RVReportSummaryApiResponse,
  RVTaxBenchmarking,
} from '../types';
import { RAILZ_API_HOST } from '../types/constants/endpoints';

import { ConfigurationInstance } from './configuration';

/**
 * RequestService to make API Calls to Accounting Data as a Service™
 **/
class RequestService {
  getUrl = (): string => {
    return ConfigurationInstance.configuration?.endpoint || RAILZ_API_HOST;
  };

  async getReportData({
    path,
    filter,
  }: RVReportRequestParameter): Promise<
    | RVReportSummaryApiResponse
    | RVFormattedTransactionResponse
    | RVFormattedScoreResponse
    | RVFilterBankReconciliation
    | RVTaxBenchmarking
  > {
    const url = `${path}?${new URLSearchParams(filter as any)}`;
    return await this.getRequest({
      url,
    });
  }

  async getRequest({
    url,
  }: RVReportRequest): Promise<RVReportSummaryApiResponse | RVFormattedTransactionResponse> {
    const token = ConfigurationInstance.configuration?.token;
    const baseUrl = this.getUrl();
    return await fetch(`${baseUrl}${url}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 204 || response.status === 202) return response;
      return response.json();
    });
  }
}

export const RequestServiceInstance = new RequestService();
