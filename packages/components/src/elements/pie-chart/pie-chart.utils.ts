import { pick, isNil } from 'lodash-es';
import { format, parseISO } from 'date-fns';

import Translations from '../../config/translations/en.json';
import {
  ALL_FONTS,
  RAILZ_PIE_COLORS,
  RVFormattedPieResponse,
  RVParams,
  RVPieChartSummary,
  RVReportRequestDateParameter,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import { RAILZ_DATE_FORMAT } from '../../types/constants/date';
import { roundNumber } from '../../helpers/utils';

interface Data {
  name: string;
  y: number;
}

export const getOptionsPie = (summary: RVPieChartSummary, id = 'id'): any => {
  const data: Data[] = summary?.subSections
    .filter((item) => item.amount > 0)
    .map((item) => {
      return {
        name: item.name,
        y: item.amount,
      };
    });
  return {
    chart: {
      style: {
        fontFamily: ALL_FONTS,
      },
      events: {
        load(): void {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const chart = this;
          setTimeout(() => {
            if (!isNil(chart)) {
              try {
                chart.reflow();
              } catch (e) {}
            }
          }, 0);
        },
      },
    },
    credits: {
      enabled: false,
    },
    colors: RAILZ_PIE_COLORS,
    title: null,
    series: [
      {
        dataLabels: {
          enabled: false,
          connectorWidth: 0,
          connectorPadding: -10,
        },
        minPointSize: 35,
        innerSize: '60%',
        zMin: 0,
        type: 'variablepie',
        showInLegend: true,
        data,
        id,
        enableMouseTracking: false,
      },
    ],
    exporting: {
      enabled: false,
    },
    legend: {
      align: 'left',
      layout: 'vertical',
      verticalAlign: 'middle',
      marginLeft: 0,
      floating: false,
      width: 96,
      y: 15,
      x: -10,
      useHTML: true,
      itemMarginBottom: 48,
      labelFormatter: function (): any {
        return `
        <div class="legend">
          <span class="legend-value">$${roundNumber(this.y)}</span>
          <span class="legend-name">${this.name}</span>
        </div>`;
      },
    },
  };
};

/**
 * Make API call based on expected parameters for pie data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestDateParameter): Promise<RVFormattedPieResponse> => {
  let reportData;
  try {
    const startDate = format(parseISO(filter.startDate), RAILZ_DATE_FORMAT);
    const endDate = format(parseISO(filter.endDate), RAILZ_DATE_FORMAT);
    const parametersToAdd =
      RVParams.CONNECTION_ID in filter && filter?.connectionId
        ? [RVParams.CONNECTION_ID]
        : [RVParams.BUSINESS_NAME, RVParams.SERVICE_NAME];
    const allParameters = pick(
      {
        ...filter,
        startDate,
        endDate,
      },
      [RVParams.START_DATE, RVParams.END_DATE, RVParams.REPORT_FREQUENCY, ...parametersToAdd],
    );

    reportData = await RequestServiceInstance.getReportData({
      reportType: filter.reportType,
      filter: allParameters,
    });
  } catch (error) {
    errorLog(Translations.RV_NOT_ABLE_TO_RETRIEVE_REPORT_DATA, error);
    reportData = { error };
  }
  return reportData;
};
