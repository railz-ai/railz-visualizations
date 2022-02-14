import {RVReportTypes} from "../types/enum/report-type";
import {RVBaseAllFilter} from "../types/interface/filter";
import Config from '../config';
import {RVFormattedTransactionResponse, RVReportSummaryApiResponse} from "../types";

interface ReportDataRequest {
  token: string;
  reportType: RVReportTypes;
  filter: RVBaseAllFilter;
}

class RequestService {
  constructor() {
  }

  async getReportData({
                        token,
                        reportType,
                        filter
                      }: ReportDataRequest): Promise<RVReportSummaryApiResponse | RVFormattedTransactionResponse> {
    const url = `${reportType}?${new URLSearchParams(filter as any)}`;

    return await this.getRequest({
      url,
      token,
    });
  }

  async getRequest({url, token}): Promise<RVReportSummaryApiResponse | RVFormattedTransactionResponse> {
    return await fetch(`${Config.SERVER_URL}/reports/${url}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },

    }).then(response => {
      if (response.status === 204) return response;
      return response.json();
    });
  }
}

export const RequestServiceInstance = new RequestService();
