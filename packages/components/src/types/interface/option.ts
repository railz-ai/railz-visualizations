
export interface RVOptionsContainer {
  style?: {[key: string]: any};
}

export interface RVOptionsTitle {
  style?: {[key: string]: any};
  text?: string;
}

export interface RVOptionsChartDate {
  quarter: string;
}

export interface RVOptionsChartStyle {
  colors?: string[];
  fontFamily?: string;
  backgroundColor?: string;
  label?: {[key: string]: any};
  legend?: {[key: string]: any};
  width?: string;
  height?: string;
  title?: {[key: string]: any};
  subTitle?: {[key: string]: any};
}

export interface RVOptionsBarStyle {
  titleStyle?: {[key: string]: any};
  titleValueStyle?: {[key: string]: any};
  subTitle1Style?: {[key: string]: any};
  subTitleValue1Style?: {[key: string]: any};
  subTitle2Style?: {[key: string]: any};
  subTitleValue2Style?: {[key: string]: any};
  barStyle?: {[key: string]: any};
  progressStyle?: {[key: string]: any};
}

export interface RVLoadingIndicatorStyle {
  fillColor?: string;
  textColor?: string;
}

export interface RVErrorIndicatorStyle {
  fillColor?: string;
  textColor?: string;
}

export interface RVOptions {
  container?: RVOptionsContainer;
  title?: RVOptionsTitle;
  chart?: RVOptionsChartStyle;
  bar?: RVOptionsBarStyle;
  loadingIndicator?: RVLoadingIndicatorStyle;
  errorIndicator?: RVErrorIndicatorStyle;
}
