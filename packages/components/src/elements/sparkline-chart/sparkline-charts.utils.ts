/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ALL_FONTS, RVOptionsBaseChartStyle } from '../../types';

export const getOptions = (data: any, options?: RVOptionsBaseChartStyle): any => ({
  chart: {
    type: 'line',
    backgroundColor: options?.backgroundColor || '#ffffff',
    height: options?.height || 60,
    reflow: true,
    marginTop: 0,
    spacingTop: 0,
    spacingRight: 0,
    marginRight: 0,
    style: {
      fontFamily: ALL_FONTS,
      ...options?.style,
    },
    events: {
      load(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const chart = this;
        setTimeout(() => {
          if (chart) {
            try {
              chart.reflow();
            } catch (e) {}
          }
        }, 0);
      },
    },
  },
  colors: options?.colors || ['#015B7E'],

  title: {
    text: undefined,
  },

  xAxis: {
    labels: {
      enabled: false,
    },
    visible: false,
    tickLength: 0,
    ...options?.xAxisStyle,
  },
  yAxis: {
    gridLineDashStyle: 'longdash',
    title: {
      text: null,
    },
    maxPadding: 0.1,
    minPadding: 0.1,
    tickAmount: 1,
    tickPositioner: function (): any {
      return [0];
    },
    endOnTick: false,
    startOnTick: false,
    softMin: -2,
    softMax: 2,
    labels: {
      style: {
        color: '#424242',
        ...options?.label,
      },
    },
    ...options?.yAxisStyle,
  },

  tooltip: {
    enabled: false,
  },

  legend: {
    enabled: false,
  },

  series: [
    {
      data,
    },
  ],
  plotOptions: {
    series: {
      enableMouseTracking: false,
      lineWidth: 3,
      shadow: false,
      marker: {
        radius: null,
      },
    },
  },
  credits: {
    enabled: false,
  },
});
