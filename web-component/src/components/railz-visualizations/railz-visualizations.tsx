import { Component, Prop, h, State } from '@stencil/core';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import indicators from 'highcharts/indicators/indicators';
import trendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import { isNil } from 'lodash';
import { compareAsc, parseISO, format } from 'date-fns';
import { RailzVisualizationsConfiguration, RailzVisualizationsFilter, RailzVisualizationsOptions } from './types';

exporting(Highcharts);
indicators(Highcharts);
trendline(Highcharts);
highchartsAccessibility(Highcharts);

@Component({
  tag: 'railz-visualizations',
  styleUrl: 'railz-visualizations.css',
  shadow: true,
})
export class RailzVisualizations {
  @Prop() configuration!: RailzVisualizationsConfiguration | string;
  @Prop() filter!: RailzVisualizationsFilter | string;
  @Prop() options: RailzVisualizationsOptions | string;

  @State()
  private _loading: string = '';
  @State()
  private _configuration: RailzVisualizationsConfiguration;
  @State()
  private _filter: RailzVisualizationsFilter;
  @State()
  private _balanceSheetFormatted;
  @State()
  private error: string;
  @State()
  private alert: string;
  private containerRef?: HTMLDivElement;

  log = (message1, message2: any = '') => {
    if (this._configuration?.debug) {
      console.log(message1, message2);
    }
  };

  propsUpdated = () => {
    this.updateConfiguration();
    this.updateFilter();
    this.requestBalanceSheet();
  };

  requestBalanceSheet = async () => {
    this._loading = 'Fetching report';
    const balanceSheet = await fetch(
      `https://api.qa2.railz.ai/reports/${this._filter.reportType}?startDate=${format(parseISO(this._filter.startDate), 'yyyy-MM-dd')}&serviceName=${
        this._filter.serviceName
      }&businessName=${this._filter.businessName}&endDate=${format(parseISO(this._filter.endDate), 'yyyy-MM-dd')}&reportFrequency=${this._filter.reportFrequency}`,
      {
        headers: {
          authorization: `Bearer ${this._configuration.token}`,
        },
      },
    ).then(response => response.json());
    this._loading = 'Parsing report';
    if (balanceSheet.data) {
      this._balanceSheetFormatted = this.formatBalanceSheet(balanceSheet.data);
      this.updateOptions();
    } else {
      this.error = this.error || `Not able to retrieve balanceSheets. (${balanceSheet.error?.statusCode}) ${balanceSheet.error?.message?.[0]} `;
    }
    this._loading = '';
  };

  formatBalanceSheet = summary => {
    const categories = this.formattedDate(summary);
    const series = [
      this.formatSeries(summary, 'assets'),
      this.formatSeries(summary, 'liabilities'),
      {
        type: 'spline',
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 0,
          },
        },
        enableMouseTracking: false,
        ...this.formatSeries(summary, 'equity'),
      },
    ];

    return {
      categories,
      series,
      colors: ['#1D7043', '#F06C3A', '#003032'],
    };
  };

  getOptions = ({ categories, series, colors }) => ({
    chart: {
      type: 'column',
      style: {
        fontFamily: [
          'Inter',
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
      reflow: true,
      marginTop: 0,
      spacingTop: 0,
      spacingRight: 0,
      marginRight: 0,
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
    colors: colors || ['#009BBD', '#FFD738', '#003032'],
    title: null,
    xAxis: {
      categories: categories,
      offset: 50,
      labels: {
        style: {
          color: '#55565B',
        },
      },
    },
    yAxis: {
      gridLineDashStyle: 'longdash',
      endOnTick: false,
      title: null,
      labels: {
        style: {
          color: '#55565B',
        },
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
      series: {
        pointWidth: 12,
      },
    },
    legend: {
      align: 'left',
      itemMarginTop: 8,
    },
    series: series,
  });

  formattedDate = (summary): void => {
    return summary.map(data => {
      const date = parseISO(data.period.date);
      if (this._filter.reportFrequency === 'quarter') return `Q${data.period.quarter} ${format(date, 'YYYY')}`;
      if (this._filter.reportFrequency === 'year') return data.period.year.toString();
      return format(date, 'MMM yy');
    });
  };

  formatSeries = (summary, field) => ({
    name: field,
    data: summary.map(data => data[field]),
  });

  updateConfiguration = () => {
    this.log('configuration', this.configuration);
    if (this.configuration) {
      if (typeof this.configuration === 'string') {
        try {
          this.log('configuration parse - START');
          const parsedConfiguration = JSON.parse(this.configuration);
          this._configuration = parsedConfiguration;
          this.log('configuration parse - END');
        } catch (error) {
          this.error = this.error || 'Error while parsing configuration. ' + JSON.stringify(error);
        }
      } else {
        this.log('configuration as Object');
        this._configuration = this.configuration;
      }
      if (!this._configuration?.token) {
        this.error = this.error || '"token" not present.';
        return;
      }
    } else {
      this.error = this.error || '"configuration" not present.';
    }
  };

  updateFilter = () => {
    this.log('filter', this.filter);
    if (this.filter) {
      if (typeof this.filter === 'string') {
        try {
          this.log('filter parse - START');
          const parsedFilter = JSON.parse(this.filter);
          this._filter = parsedFilter;
          this.log('filter parse - END');
        } catch (error) {
          this.error = this.error || 'Error while parsing filter. ' + JSON.stringify(error);
        }
      } else {
        this.log('filter as Object');
        this._filter = this.filter;
      }
      const compare = compareAsc(parseISO(this._filter.startDate), parseISO(this._filter.endDate));
      if (compare >= 0) {
        this.error = this.error || '"endDate" before or equal "startDate".';
        return;
      }
    } else {
      this.error = this.error || '"filter" not present.';
    }
  };

  updateOptions = () => {
    let options;
    try {
      options = this.getOptions(this._balanceSheetFormatted);
    } catch (error) {
      this.error = this.error || 'Not able to parse get balanceSheets. ' + JSON.stringify(error);
    }

    if (options) {
      try {
        if (this.containerRef) Highcharts.chart(this.containerRef, options);
      } catch (error) {
        this.error = this.error || 'Not able to load Highcharts. ' + JSON.stringify(error);
      }
    }
  };

  componentWillLoad() {
    this.propsUpdated && this.propsUpdated();
  }

  componentDidLoad() {
    this.propsUpdated && this.propsUpdated();
  }

  render() {
    if (this.error) {
      return (
        <div class="error">
          <strong>Error!</strong> <span>{this.error}</span>
        </div>
      );
    }
    if (this._loading) {
      return (
        <div class="loading">
          <progress class="progress" />
          <p>{this._loading}</p>
        </div>
      );
    }
    if (this.alert) {
      return (
        <div class="alert">
          <strong>Alert!</strong> <span>{this.alert}</span>
        </div>
      );
    }
    return <div ref={el => (this.containerRef = el)} />;
  }
}
