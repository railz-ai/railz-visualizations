export interface RVOptionsContainer {
  /**
   * style: CSS object based on HTML stylings for the container
   */
  style?: { [key: string]: any };
  /**
   * To determine whether to show the tooltip for the container
   */
  tooltip?: boolean;
  /**
   * To determine whether to show the date for the container
   */
  date?: boolean;
}

export interface RVOptionsTitle {
  /**
   * style: CSS object based on HTML stylings for the container title
   */
  style?: { [key: string]: any };

  /**
   * text: The text that should be on the title
   */
  text?: string;
}

export interface RVOptionsChartDate {
  quarter: string;
}

export interface RVOptionsChartStyle {
  /**
   * colors: list of colors to use for the chart bars
   */
  colors?: string[];
  /**
   * fontFamily: font family of the chart
   */
  fontFamily?: string;
  /**
   * backgroundColor: background color of the chart
   */
  backgroundColor?: string;
  /**
   * label: CSS Object to cover the styling of the chart labels
   */
  label?: { [key: string]: any };
  /**
   * legend: CSS Object to cover the styling of the chart legends
   */
  legend?: { [key: string]: any };
  /**
   * width: width of the chart
   */
  width?: string;
  /**
   * height: height of the chart
   */
  height?: string;
}

export interface RVOptionsBarStyle {
  /**
   * titleStyle: CSS object based on HTML stylings for the bar title (
   Total unpaid value)
   */
  titleStyle?: { [key: string]: any };
  /**
   * titleValueStyle: CSS object based on HTML stylings for the bar title amount
   */
  titleValueStyle?: { [key: string]: any };
  /**
   * subTitle1Style: CSS object based on HTML stylings for the bar first sub title(Paid value)
   */
  subTitle1Style?: { [key: string]: any };
  /**
   * subTitleValue1Style: CSS object based on HTML stylings for the bar first sub title amount
   */
  subTitleValue1Style?: { [key: string]: any };
  /**
   * subTitle2Style: CSS object based on HTML stylings for the bar first sub title(Overdue value)
   */
  subTitle2Style?: { [key: string]: any };
  /**
   * subTitleValue2Style: CSS object based on HTML stylings for the bar second sub title amount
   */
  subTitleValue2Style?: { [key: string]: any };
  /**
   * barStyle: CSS object based on HTML stylings for the bar
   */
  barStyle?: { [key: string]: any };
  /**
   * progressStyle: CSS object based on HTML stylings for the bar’s progress indicator
   */
  progressStyle?: { [key: string]: any };
}

export interface RVLoadingIndicatorStyle {
  /**
   * loadingText: Text value for the loading indicator
   */
  loadingText?: string;
  /**
   * fillColor: Color for the loading indicator
   */
  fillColor?: string;
  /**
   * width: Width of the SVG Loading Indicator
   */
  width?: string;
  /**
   * height: Height of the SVG Loading Indicator
   */
  height?: string;
  /**
   * textStyle: CSS object based on HTML stylings for the loading indicator text
   */
  textStyle?: { [key: string]: any };
}

export interface RVErrorIndicatorStyle {
  /**
   * Status code based on HTTP Response codes
   */
  statusCode?: number;
  /**
   * width: Width of the SVG Error Indicator
   */
  width?: string;
  /**
   * height: Height of the SVG Error Indicator
   */
  height?: string;
  /**
   * Text to display at the bottom of the svg image
   */
  text?: string;
  /**
   * fillColor: Color for the error indicator
   */
  fillColor?: string;
  /**
   * textStyle: CSS object based on HTML stylings for the text displayed in the error indicator
   */
  textStyle?: { [key: string]: any };
}

/**
 * tooltipStyle: Object to cover basic styling of tooltip message
 */
export interface RVTooltipStyle {
  /**
   * Position where the tooltip text will appear
   */
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right';
  /**
   * style: CSS object based on HTML stylings for the container
   */
  style?: { [key: string]: any };
}

/**
 * RVSelectStyle: Object to cover basic styling of select
 */
export interface RVSelectStyle {
  /**
   * Position where the select options will appear
   */
  position?: 'center' | 'left' | 'right';
}

export interface RVOptions {
  /**
   * container: object to cover the bounding box of the chart
   */
  container?: RVOptionsContainer;
  /**
   * title: object to cover the title of the chart
   */
  title?: RVOptionsTitle;
  /**
   * chart: Object to cover the styling options of the chart
   */
  chart?: RVOptionsChartStyle;
  /**
   * bar: Object to cover the styling options of the progress bar
   */
  bar?: RVOptionsBarStyle;
  /**
   * loadingIndicator: Object to cover basic styling of the loading indicator
   */
  loadingIndicator?: RVLoadingIndicatorStyle;
  /**
   * errorIndicator: Object to cover basic styling of the error indicator
   */
  errorIndicator?: RVErrorIndicatorStyle;
}
