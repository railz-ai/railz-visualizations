import { format, parseISO } from 'date-fns';
import { RailzVisualizationsFilter } from '../components/railz-visualizations/types';
import { isBarChart } from '../components/railz-visualizations/utils/utils';
import { apis } from '../../utils/resources';

interface ReportDataRequest extends RailzVisualizationsFilter {
  token: string;
}

class RequestService {
  constructor() {}

  async getReportData({ token, reportType, startDate, endDate, serviceName, businessName, connectionId, reportFrequency }: ReportDataRequest) {
    const formattedStartDate = format(parseISO(startDate), 'yyyy-MM-dd');
    const formattedEndDate = format(parseISO(endDate), 'yyyy-MM-dd');
    let params = [];
    params.push(`startDate=${formattedStartDate}`);
    params.push(`endDate=${formattedEndDate}`);
    if (isBarChart(reportType)) params.push(`reportFrequency=${reportFrequency}`);
    if (serviceName) params.push(`serviceName=${serviceName}`);
    if (businessName) params.push(`businessName=${businessName}`);
    if (connectionId) params.push(`connectionId=${connectionId}`);

    const url = `${reportType}?${params.join('&')}`;

    return await this.getRequest({
      url,
      token,
    });
  }
  async getRequest({ url, token }) {
    const toReturn = await fetch(apis.feeder + '/reports/' + url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(response => {
      if (response.status === 204) return response;
      return response.json();
    });
    return toReturn;
  }
}
export const RequestServiceInstance = new RequestService();
