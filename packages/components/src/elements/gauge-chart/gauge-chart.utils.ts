import { pick, isNil } from 'lodash-es';
import { format, parseISO } from 'date-fns';

import Translations from '../../config/translations/en.json';
import {
  ALL_FONTS,
  RVFormattedGaugeResponse,
  RVGaugeChartSummary,
  RVReportRequestDateParameter,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import { RAILZ_DATE_FORMAT } from '../../types/constants/date';

const plotLine = {
  width: 3,
  color: '#fff',
  zIndex: 4,
};
const getData = (score: number): number[] => {
  const data = [];
  if (score > 850) {
    data.push(score);
  }
  if (score > 750) {
    data.push(850);
  }
  if (score > 675) {
    data.push(750);
  }
  if (score > 625) {
    data.push(675);
  }
  if (score > 575) {
    data.push(625);
  }
  if (score > 525) {
    data.push(575);
  }
  if (score > 0) {
    data.push(525);
  }
  return data;
};

const getColor = (score: number): string => {
  if (score > 750) {
    return '#00884F';
  }
  if (score > 675) {
    return '#15D283';
  }
  if (score > 625) {
    return '#6DE18D';
  }
  if (score > 575) {
    return '#A2DF61';
  }
  if (score > 525) {
    return '#E0E345';
  }
  return ' #FFD839';
};

/**
 * Setup Highcharts options for gauge
 */
export const getOptionsGauge = (gauge: RVGaugeChartSummary): any => ({
  chart: {
    type: 'solidgauge',
    margin: [0, 0, 0, 0],
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
  title: null,
  style: {
    height: '128px',
    width: '128px',
  },
  pane: {
    center: ['50%', '50%'],
    size: '80%',
    startAngle: -90,
    endAngle: 90,
    background: [
      {
        backgroundColor: '#F5F5F5',
        shape: 'arc',
        borderColor: 'transparent',
        outerRadius: '90%',
        innerRadius: '100%',
      },
      {
        innerRadius: '83%',
        outerRadius: '83%',
        shape: 'arc',
        borderWidth: 3,
        borderColor: '#F5F5F5',
        backgroundColor: 'transparent',
      },
    ],
  },
  tooltip: {
    enabled: false,
  },
  // the value axis
  yAxis: {
    min: 300,
    max: 850,
    tickPositions: [300, 850],
    labels: {
      distance: -5,
      y: 15,
      style: { color: '#757575' },
    },
    stops: [[0, getColor(gauge?.score)]],
    plotLines: [
      {
        value: 525,
        ...plotLine,
      },
      {
        value: 575,
        ...plotLine,
      },
      {
        value: 625,
        ...plotLine,
      },
      {
        value: 675,
        ...plotLine,
      },
      {
        value: 750,
        ...plotLine,
      },
      {
        value: 850,
        ...plotLine,
      },
    ],
    lineColor: '#F5F5F5',
    lineWidth: 0,
    minorTickInterval: null,
    tickPixelInterval: 400,
    tickWidth: 0,
  },

  plotOptions: {
    solidgauge: {
      innerRadius: '90%',
      dataLabels: {
        enabled: true,
        y: -40,
        borderWidth: 0,
        backgroundColor: 'none',
        useHTML: true,
        shadow: false,
        style: {
          fontSize: '16px',
          fontFamily: ALL_FONTS,
        },
        formatter: function (): string {
          return `
            <div style="width:100%;text-align:center;">
              <span style="font-size:2.25rem;color: black;font-weight:600;">${gauge?.score}</span><br/>
              <span style="font-size:1rem;font-weight: 400;">${gauge?.rating}</span>
            </div>`;
        },
      },
      tooltip: {
        valueSuffix: '',
      },
    },
  },
  series: [
    {
      data: getData(gauge?.score),
      animation: {
        duration: 1000,
      },
      tooltip: {
        useHTML: true,
      },
    },
  ],
  exporting: {
    enabled: false,
  },
});

/**
 * Make API call based on expected parameters for score data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestDateParameter): Promise<RVFormattedGaugeResponse> => {
  let reportData;
  try {
    const startDate = format(parseISO(filter.startDate), RAILZ_DATE_FORMAT);
    const endDate = format(parseISO(filter.endDate), RAILZ_DATE_FORMAT);
    const parametersToAdd =
      'connectionId' in filter && filter?.connectionId
        ? ['connectionId']
        : ['businessName', 'serviceName'];
    const allParameters = pick(
      {
        ...filter,
        startDate,
        endDate,
      },
      ['startDate', 'endDate', ...parametersToAdd],
    );

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
