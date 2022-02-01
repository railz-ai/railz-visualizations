import { format, parseISO } from 'date-fns';
import { RailzVisualizationsFilter } from '../components/railz-visualizations/types';

interface BalanceSheetsRequest extends RailzVisualizationsFilter {
  token: string;
}

class RequestService {
  constructor() {}

  async getBalanceSheets({ token, reportType, startDate, endDate, serviceName, businessName, reportFrequency }: BalanceSheetsRequest) {
    const formattedStartDate = format(parseISO(startDate), 'yyyy-MM-dd');
    const formattedEndDate = format(parseISO(endDate), 'yyyy-MM-dd');
    const url = `${reportType}?startDate=${formattedStartDate}&endDate=${formattedEndDate}&serviceName=${serviceName}&businessName=${businessName}&reportFrequency=${reportFrequency}`;

    const toReturn = await this.getRequest({
      url,
      token,
    });

    return toReturn;
  }
  async getRequest({ url, token }) {
    const toReturn = await fetch('https://api.qa2.railz.ai/reports/' + url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(response => response.json());
    return toReturn;
  }
}
export const RequestServiceInstance = new RequestService();
