import {
  RVFormattedGaugeResponse,
  RVFormattedTransactionResponse,
  RVReportRequest,
  RVReportRequestParameter,
  RVReportSummaryApiResponse,
} from '../types';
import { RAILZ_API_HOST } from '../types/constants/endpoints';

import { ConfigurationInstance } from './configuration';

/**
 * RequestService to make API Calls to Railz
 **/
class RequestService {
  getUrl = (): string => {
    return ConfigurationInstance.configuration?.endpoint || RAILZ_API_HOST;
  };

  async getReportData({
    filter,
  }: RVReportRequestParameter): Promise<
    RVReportSummaryApiResponse | RVFormattedTransactionResponse | RVFormattedGaugeResponse
  > {
    const url = `${filter.reportType}?${new URLSearchParams(filter as any)}`;

    return await this.getRequest({
      url,
    });
  }

  async getRequest({
    url,
  }: RVReportRequest): Promise<RVReportSummaryApiResponse | RVFormattedTransactionResponse> {
    const token = ConfigurationInstance.configuration?.token;
    const baseUrl = this.getUrl();
    return await fetch(`${baseUrl}/reports/${url}`, {
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
