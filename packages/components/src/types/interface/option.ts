import { RVContent } from './content';

export interface RVOptionsContainer {
  /**
   * style: CSS object based on HTML stylings for the container
   */
  style?: { [key: string]: any };
}

export interface RVOptionsTitle {
  /**
   * style: CSS object based on HTML stylings for the container title
   */
  style?: { [key: string]: any };

  /**
   * visible: determine if to show title
   */
  visible?: boolean;
}

export interface RVOptionsSubTitle {
  /**
   * style: CSS object based on HTML stylings for the container subtitle
   */
  style?: { [key: string]: any };

  /**
   * position: location of the text
   */
  position?: 'top' | 'bottom';

  /**
   * visible: determine if to show subtitle
   */
  visible?: boolean;

  /**
   * dateVisible: determine if to show date
   */
  dateVisible?: boolean;
}

export interface RVOptionsChartDate {
  quarter: string;
}

export interface RVOptionsBaseChartStyle {
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
   * style:  Object to cover the styling of the chart container
   */
  style?: { [key: string]: any };
  /**
   * label: CSS Object to cover the styling of the chart labels
   */
  label?: { [key: string]: any };
  /**
   * legend: CSS Object to cover the styling of the chart legends
   */
  legend?: { [key: string]: any };
  /**
   * yAxisStyle: HighChart CSS Object to cover the styling of the chart yAxis
   */
  yAxisStyle?: { [key: string]: any };
  /**
   * xAxisStyle: HighChart CSS Object to cover the styling of the chart xAxis
   */
  xAxisStyle?: { [key: string]: any };
  /**
   * width: width of the chart
   */
  width?: string;
  /**
   * height: height of the chart
   */
  height?: string;
}

export interface RVOptionsChartStyle extends RVOptionsBaseChartStyle {
  /**
   * pie: javascript object to cover the styling of additional pie chart properties
   */
  pie?: RVOptionsChartPieStyle;

  /**
   * gauge: javascript object to cover the styling of additional gauge chart properties
   */
  gauge?: RVOptionsGaugeStyle;
}

interface RVOptionsChartPieStyle extends RVOptionsPercentageStyle {
  /**
   * total: CSS Object to cover the styling of the pie chart total
   */
  total?: { [key: string]: any };
  /**
   * legendValue: CSS Object to cover the styling of the pie chart legend value
   */
  legendValue?: { [key: string]: any };
  /**
   * legendName: CSS Object to cover the styling of the pie chart legend name
   */
  legendName?: { [key: string]: any };
}

export interface RVOptionsBarStyle {
  /**
   * divStyle: CSS object based on HTML stylings for the complete div
   */
  divStyle?: { [key: string]: any };
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

export interface RVColorRangesStyle {
  /**
   * default: default color string
   */
  default?: string;

  /**
   * 525: color string for score 525
   */
  525?: string;

  /**
   * 575: color string for score 575
   */
  575?: string;

  /**
   * 625: color string for score 625
   */
  625?: string;

  /**
   * 675: color string for score 675
   */
  675?: string;

  /**
   * 750: color string for score 750
   */
  750?: string;
}

export interface RVOptionsGaugeStyle {
  /**
   * score: CSS object based on HTML stylings for the score section
   */
  score?: { [key: string]: any };

  /**
   * rating: CSS object based on HTML stylings for the rating section
   */
  rating?: { [key: string]: any };

  /**
   * colorRanges: Object containing color by range
   */
  colorRanges?: RVColorRangesStyle;
}
export interface RVOptionsTableStyle {
  /**
   * style: CSS object based on HTML stylings for the whole banking info list section
   */
  style?: { [key: string]: any };
  /**
   * title: CSS object based on HTML stylings for the banking info table items
   */
  title?: { [key: string]: any };
  /**
   * itemContainer: CSS object based on HTML stylings for the  banking info accounts container
   */
  itemContainer?: { [key: string]: any };
  /**
   * itemName: CSS object based on HTML stylings for the banking info accounts name
   */
  itemName?: { [key: string]: any };
  /**
   * itemValue: CSS object based on HTML stylings for the banking info accounts value
   */
  itemValue?: { [key: string]: any };
  /**
   * itemSeperator: CSS object based on HTML stylings for the banking info seperation line between account and value
   */
  itemSeperator?: { [key: string]: any };
}
export interface RVOptionsRatioStyle {
  /**
   * itemContainer: CSS object based on HTML stylings for the whole ratio chart container
   */
  itemContainer?: { [key: string]: any };
  /**
   * header: CSS object based on HTML stylings for the ratio chart header
   */
  header?: { [key: string]: any };
  /**
   * select: object for styling the select
   */
  select?: RVSelectStyle;
  /**
   * itemInfo: CSS object based on HTML stylings for ratio chart item info section
   */
  itemInfo?: { [key: string]: any };
  /**
   * itemName: CSS object based on HTML stylings for the ratio chart item name section
   */
  itemName?: { [key: string]: any };
  /**
   * itemNameText: CSS object based on HTML stylings for the ratio chart item name text
   */
  itemNameText?: { [key: string]: any };
  /**
   * itemToolTip: object based on HTML stylings for the ratio chart item tool tip
   */
  itemToolTip?: RVTooltipIndicatorStyle;
  /**
   * itemValue: CSS object based on HTML stylings for the ratio chart item value
   */
  itemValue?: { [key: string]: any };
  /**
   * itemSummary: CSS object based on HTML stylings for the ratio chart item summary section
   */
  itemSummary?: { [key: string]: any };
  /**
   * itemPercentage: RVOptionsPercentageStyle object for the ratio chart item percentage
   */
  itemPercentage?: RVOptionsPercentageStyle;
  /**
   * ratios: CSS object based on HTML stylings for the ratio chart ratios section
   */
  ratios?: { [key: string]: any };
  /**
   * sparkLine: CSS object based on HTML stylings for the ratio chart ratio spark line
   */
  sparkLine?: RVOptionsRatioSparkLineStyle;
}

export interface RVOptionsRatioSparkLineStyle {
  /**
   * container: CSS object based on HTML stylings for the container
   */
  container?: { [key: string]: any };
  /**
   * negative: CSS object based on HTML stylings for the chart
   */
  chart?: RVOptionsBaseChartStyle;
}

export interface RVOptionsPercentageStyle {
  /**
   * positive: string representation of the color of a  positive percentage
   */
  positive?: { [key: string]: any };
  /**
   * negative: string representation of the color of a  negative percentage
   */
  negative?: { [key: string]: any };
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

/**
 * RVTooltipIndicatorStyle: Object to cover basic styling of tooltip message
 */
export interface RVTooltipIndicatorStyle {
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
   * style: CSS object based on HTML stylings for the tooltip
   */
  style?: { [key: string]: any };
  /**
   * text: CSS object based on HTML stylings for the text
   */
  textStyle?: { [key: string]: any };
  /**
   * tooltipTextStyle: CSS object based on HTML stylings for the text/image
   */
  tooltipTextStyle?: { [key: string]: any };
  /**
   * Position where the tooltip text will appear
   */
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right';
  /**
   * visible: determine if to show tooltip
   */
  visible?: boolean;
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
 * RVSelectStyle: Object to cover basic styling of select
 */
export interface RVSelectStyle {
  /**
   * Position where the select options will appear
   */
  position?: 'center' | 'left' | 'right';
  /**
   * CSS object based on HTML stylings for each item in the dropdown
   */
  item?: { [key: string]: any };
  /**
   * CSS object based on HTML stylings for each selected item in the dropdown
   */
  selectedItem?: { [key: string]: any };
  /**
   * CSS object based on HTML stylings for the dropdown
   */
  container?: { [key: string]: any };
  /**
   * CSS object based on HTML stylings for the box
   */
  style?: { [key: string]: any };
  /**
   * Object for the arrow
   */
  arrow?: RVOptionsTitle;
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
   * subTitle: object to cover the subTitle of the chart container
   */
  subTitle?: RVOptionsSubTitle;
  /**
   * chart: Object to cover the styling options of the chart
   */
  chart?: RVOptionsChartStyle;
  /**
   * bar: Object to cover the styling options of the progress bar
   */
  bar?: RVOptionsBarStyle;
  /**
   * bar: Object to cover the styling options of the ratio diagram
   */
  ratio?: RVOptionsRatioStyle;
  /**
   * table: Object to cover the styling options of the table diagram
   */
  table?: RVOptionsTableStyle;
  /**
   * loadingIndicator: Object to cover basic styling of the loading indicator
   */
  loadingIndicator?: RVLoadingIndicatorStyle;
  /**
   * errorIndicator: Object to cover basic styling of the error indicator
   */
  errorIndicator?: RVErrorIndicatorStyle;
  /**
   * tooltipIndicator: Object to cover basic styling of the error indicator
   */
  tooltipIndicator?: RVTooltipIndicatorStyle;
  /**
   * content: Content information that change text for i18n
   */
  content?: RVContent;
}
