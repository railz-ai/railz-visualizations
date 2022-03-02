export interface RVOptionsContainer {
  style?: any;
  tooltip?: boolean;
  date?: boolean;
}

export interface RVOptionsTitle {
  style?: any;
}

export interface RVOptionsChartDate {
  quarter: string;
}

export interface RVOptionsChartStyle {
  fontFamily: string;
  label: any;
  legend: any;
  width: string;
  height: string;
}

export interface RVOptionsChart {
  colors?: string[];
  style?: RVOptionsChartStyle;
  date?: RVOptionsChartDate;
}

export interface RVOptions {
  container?: RVOptionsContainer;
  title?: RVOptionsTitle;
  chart?: RVOptionsChart;
}
