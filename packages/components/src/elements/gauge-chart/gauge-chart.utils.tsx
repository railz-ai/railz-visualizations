import { isNil } from 'lodash-es';

import { ALL_FONTS, RVCreditScoreSummary, RVOptions, RVColorRangesStyle } from '../../types';
import { fromCssObjectToInline } from '../../helpers/utils';

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

const getColor = (score: number, colors?: RVColorRangesStyle): string => {
  if (score > 750) {
    return colors?.['750'] || '#00884F';
  }
  if (score > 675) {
    return colors?.['675'] || '#15D283';
  }
  if (score > 625) {
    return colors?.['625'] || '#6DE18D';
  }
  if (score > 575) {
    return colors?.['575'] || '#A2DF61';
  }
  if (score > 525) {
    return colors?.['525'] || '#E0E345';
  }
  return colors?.default || '#FFD839';
};

/**
 * Setup Highcharts options for gauge
 */
export const getOptionsGauge = (gauge: RVCreditScoreSummary, options: RVOptions): any => ({
  chart: {
    type: 'solidgauge',
    margin: [0, 0, 0, 0],
    style: {
      fontFamily: options?.chart?.fontFamily || ALL_FONTS,
      ...options?.chart?.style,
    },
    backgroundColor: options?.chart?.backgroundColor || '#ffffff',
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
  pane: {
    center: ['50%', '65%'],
    size: options?.chart?.gauge?.size || '90%',
    startAngle: options?.chart?.gauge?.startAngle || -90,
    endAngle: options?.chart?.gauge?.endAngle || 90,
    background: [
      {
        backgroundColor: '#F5F5F5',
        shape: 'arc',
        borderColor: 'transparent',
        outerRadius: '90%',
        innerRadius: '100%',
      },
      options?.chart?.type === 'circle'
        ? undefined
        : {
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
    min: options?.chart?.type === 'circle' ? 0 : 300,
    max: 850,
    tickPositions: options?.chart?.type === 'circle' ? undefined : [300, 850],
    labels:
      options?.chart?.type === 'circle'
        ? { enabled: false }
        : {
            distance: -5,
            y: 15,
            style: { color: '#757575', ...options?.chart?.label },
          },
    stops: [[0, getColor(gauge?.score, options?.chart?.gauge?.colorRanges)]],
    plotLines:
      options?.chart?.type === 'circle'
        ? undefined
        : [
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
    ...options?.chart?.yAxisStyle,
  },

  plotOptions: {
    solidgauge: {
      innerRadius: options?.chart?.gauge?.innerRadius ? options?.chart?.gauge?.innerRadius : '90%',
      dataLabels: {
        enabled: true,
        y: options?.chart?.type === 'circle' ? -14 : -40,
        borderWidth: 0,
        backgroundColor: 'none',
        useHTML: true,
        shadow: false,
        style: {
          fontSize: '16px',
          fontFamily: options?.chart?.fontFamily || ALL_FONTS,
        },
        formatter: function (): string {
          return `
            <div style="width:100%;text-align:center;font-family: ${
              options?.chart?.fontFamily || ALL_FONTS
            }">
              <span style="font-size: 36px;color: black;font-weight:600;${fromCssObjectToInline(
                options?.chart?.gauge?.score,
              )}">${gauge?.score}${gauge?.percentage ? '%' : ''}%</span><br/>
              <span style="font-size: 16px;font-weight: 400; ${fromCssObjectToInline(
                options?.chart?.gauge?.rating,
              )}">${gauge?.rating}</span>
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
