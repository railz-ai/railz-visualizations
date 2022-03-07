import {
  RVFormattedTransactionResponse,
  RVReportDataRequest,
  RVReportRequest,
  RVReportSummaryApiResponse,
} from '../types';
import { RAILZ_API_HOST } from '../types/constants/endpoints';

import { ConfigurationInstance } from './configuration';

class RequestService {
  getUrl = (): string => {
    const environment = ConfigurationInstance.configuration?.environment;
    if (environment && environment !== 'production') {
      if (environment === 'local') {
        return 'http://localhost:3001';
      }
      return `https://api.${environment}.railz.ai`;
    }
    return RAILZ_API_HOST;
  };
  async getReportData({
    reportType,
    filter,
  }: RVReportDataRequest): Promise<RVReportSummaryApiResponse | RVFormattedTransactionResponse> {
    const url = `${reportType}?${new URLSearchParams(filter as any)}`;

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
