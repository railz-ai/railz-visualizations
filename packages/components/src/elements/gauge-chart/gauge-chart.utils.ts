import { pick, isNil } from 'lodash-es';
import { format, parseISO } from 'date-fns';

import Translations from '../../config/translations/en.json';
import {
  RAILZ_PRIMARY_COLOR,
  RVFormattedGaugeResponse,
  RVGaugeChartSummary,
  RVReportRequestDateParameter,
} from '../../types';
import { RequestServiceInstance } from '../../services/request';
import { errorLog } from '../../services/logger';
import { ALL_FONTS } from '../../helpers/chart.utils';

const linearGradient = {
  x1: 0,
  x2: 1,
  y1: 0,
  y2: 0,
};
const plotLine = {
  width: 3,
  color: '#fff',
  zIndex: 4,
};
const gradientColors = ['#FFD738', '#25E896', RAILZ_PRIMARY_COLOR];
const getData = (score: number): number[] => {
  const data = [];
  if (score > 800) {
    data.push(score);
  }
  if (score > 750) {
    data.push(800);
  }
  if (score > 700) {
    data.push(750);
  }
  if (score > 650) {
    data.push(700);
  }
  if (score > 550) {
    data.push(650);
  }
  if (score > 300) {
    data.push(550);
  }
  if (score > 0) {
    data.push(300);
  }
  return data;
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
    stops: [
      [
        450 / 850,
        {
          linearGradient,
          stops: [
            [0, gradientColors[0]],
            [1, gradientColors[0]],
          ],
        },
      ],
      [
        550 / 850,
        {
          linearGradient,
          stops: [
            [0, gradientColors[0]],
            [0.5, gradientColors[0]],
            [1, gradientColors[1]],
          ],
        },
      ],
      [
        650 / 850,
        {
          linearGradient,
          stops: [[1, gradientColors[1]]],
        },
      ],
      [
        700 / 850,
        {
          linearGradient,
          stops: [[1, gradientColors[1]]],
        },
      ],
      [
        750 / 850,
        {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, gradientColors[1]],
            [0.5, gradientColors[1]],
            [0.65, gradientColors[2]],
            [0.85, gradientColors[2]],
            [1, gradientColors[2]],
          ],
        },
      ],
      [
        800 / 850,
        {
          linearGradient,
          stops: [[1, gradientColors[2]]],
        },
      ],
      [
        850 / 850,
        {
          linearGradient,
          stops: [[1, gradientColors[2]]],
        },
      ],
    ],
    plotLines: [
      {
        value: 550,
        ...plotLine,
      },
      {
        value: 650,
        ...plotLine,
      },
      {
        value: 700,
        ...plotLine,
      },
      {
        value: 750,
        ...plotLine,
      },
      {
        value: 800,
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
          return (
            '<div style="width:100%;text-align:center;">' +
            '<span style="font-size:2.25rem;color: black;font-weight:600;">' +
            gauge?.score +
            '</span><br/><span style="font-size:1rem;font-weight: 400;">' +
            gauge?.rating +
            '</span>'
          );
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
});

/**
 * Make API call based on expected parameters for financial statements data type
 */
export const getReportData = async ({
  filter,
}: RVReportRequestDateParameter): Promise<RVFormattedGaugeResponse> => {
  let reportData;
  try {
    const startDate = format(parseISO(filter.startDate), 'yyyy-MM-dd');
    const endDate = format(parseISO(filter.endDate), 'yyyy-MM-dd');
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
