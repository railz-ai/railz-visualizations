/* eslint-disable max-len */
import { getOptions } from '../sparkline-charts.utils';

describe('SparklineChart', () => {
  describe('getOptions', () => {
    describe('success path', () => {
      test('returns highcharts options for correct data', async () => {
        const data = [
          -1.22008271, -1.22008271, -1.22008271, -1.22008271, -1.22008271, -1.22008271, -1.22008271,
          -1.22008271, -1.22008271, -1.22008271, -1.22008271, -1.22008271, -1.22008271,
        ];
        expect(JSON.stringify(getOptions(data))).toStrictEqual(
          JSON.stringify({
            chart: {
              type: 'line',
              backgroundColor: '#ffffff',
              height: 60,
              reflow: true,
              marginTop: 0,
              spacingTop: 0,
              spacingRight: 0,
              marginRight: 0,
              style: {
                fontFamily:
                  'Inter,Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
              },
              events: {},
            },
            colors: ['#015B7E'],
            title: {},
            xAxis: {
              labels: {
                enabled: false,
              },
              visible: false,
              tickLength: 0,
            },
            yAxis: {
              gridLineDashStyle: 'longdash',
              title: {
                text: null,
              },
              maxPadding: 0.1,
              minPadding: 0.1,
              tickAmount: 1,
              endOnTick: false,
              startOnTick: false,
              softMin: -2,
              softMax: 2,
              labels: {
                style: {
                  color: '#424242',
                },
              },
            },
            tooltip: {
              enabled: false,
            },
            legend: {
              enabled: false,
            },
            series: [
              {
                data: [
                  -1.22008271, -1.22008271, -1.22008271, -1.22008271, -1.22008271, -1.22008271,
                  -1.22008271, -1.22008271, -1.22008271, -1.22008271, -1.22008271, -1.22008271,
                  -1.22008271,
                ],
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
          }),
        );
      });

      test('returns highcharts options for empty data', async () => {
        const data = [];
        expect(JSON.stringify(getOptions(data))).toStrictEqual(
          JSON.stringify({
            chart: {
              type: 'line',
              backgroundColor: '#ffffff',
              height: 60,
              reflow: true,
              marginTop: 0,
              spacingTop: 0,
              spacingRight: 0,
              marginRight: 0,
              style: {
                fontFamily:
                  'Inter,Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
              },
              events: {},
            },
            colors: ['#015B7E'],
            title: {},
            xAxis: {
              labels: {
                enabled: false,
              },
              visible: false,
              tickLength: 0,
            },
            yAxis: {
              gridLineDashStyle: 'longdash',
              title: {
                text: null,
              },
              maxPadding: 0.1,
              minPadding: 0.1,
              tickAmount: 1,
              endOnTick: false,
              startOnTick: false,
              softMin: -2,
              softMax: 2,
              labels: {
                style: {
                  color: '#424242',
                },
              },
            },
            tooltip: {
              enabled: false,
            },
            legend: {
              enabled: false,
            },
            series: [
              {
                data: [],
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
          }),
        );
      });
    });
  });
});

// yarn test packages/components/src/elements/sparkline-chart/test/sparkline-charts.utils.spec.tsx
