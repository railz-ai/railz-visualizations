/* tslint:disable */
/* auto-generated angular directive proxies */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
} from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@railzai/railz-visualizations';

export declare interface RailzBankAccounts extends Components.RailzBankAccounts {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['configuration', 'filter', 'options'],
})
@Component({
  selector: 'railz-bank-accounts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['configuration', 'filter', 'options'],
})
export class RailzBankAccounts {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzErrorImage extends Components.RailzErrorImage {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['fillColor', 'height', 'statusCode', 'textStyle', 'width'],
})
@Component({
  selector: 'railz-error-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['fillColor', 'height', 'statusCode', 'textStyle', 'width'],
})
export class RailzErrorImage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzFinancialRatios extends Components.RailzFinancialRatios {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['configuration', 'filter', 'options'],
})
@Component({
  selector: 'railz-financial-ratios',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['configuration', 'filter', 'options'],
})
export class RailzFinancialRatios {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzGaugeChart extends Components.RailzGaugeChart {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['configuration', 'filter', 'options'],
})
@Component({
  selector: 'railz-gauge-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['configuration', 'filter', 'options'],
})
export class RailzGaugeChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzGaugeChartComponent extends Components.RailzGaugeChartComponent {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['data', 'options'],
})
@Component({
  selector: 'railz-gauge-chart-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['data', 'options'],
})
export class RailzGaugeChartComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzLoading extends Components.RailzLoading {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['fillColor', 'height', 'loadingText', 'textStyle', 'width'],
})
@Component({
  selector: 'railz-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['fillColor', 'height', 'loadingText', 'textStyle', 'width'],
})
export class RailzLoading {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzPercentage extends Components.RailzPercentage {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['percentage', 'percentageStyle'],
})
@Component({
  selector: 'railz-percentage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['percentage', 'percentageStyle'],
})
export class RailzPercentage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzPieChart extends Components.RailzPieChart {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['configuration', 'filter', 'options'],
})
@Component({
  selector: 'railz-pie-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['configuration', 'filter', 'options'],
})
export class RailzPieChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzProgressBar extends Components.RailzProgressBar {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['options', 'overdueAmount', 'paidAmount', 'reportType', 'unpaidAmount'],
})
@Component({
  selector: 'railz-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['options', 'overdueAmount', 'paidAmount', 'reportType', 'unpaidAmount'],
})
export class RailzProgressBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzSelect extends Components.RailzSelect {
  /**
   *
   */
  selectedItem: EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['items', 'selectStyle'],
})
@Component({
  selector: 'railz-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['items', 'selectStyle'],
})
export class RailzSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['selectedItem']);
  }
}

export declare interface RailzSparklineChart extends Components.RailzSparklineChart {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['data', 'sparkLineStyle'],
})
@Component({
  selector: 'railz-sparkline-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['data', 'sparkLineStyle'],
})
export class RailzSparklineChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzStatementsChart extends Components.RailzStatementsChart {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['configuration', 'filter', 'options'],
})
@Component({
  selector: 'railz-statements-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['configuration', 'filter', 'options'],
})
export class RailzStatementsChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzTooltip extends Components.RailzTooltip {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['text', 'tooltipStyle', 'tooltipText'],
})
@Component({
  selector: 'railz-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['text', 'tooltipStyle', 'tooltipText'],
})
export class RailzTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzTransactionsControl extends Components.RailzTransactionsControl {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['configuration', 'filter', 'options'],
})
@Component({
  selector: 'railz-transactions-control',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['configuration', 'filter', 'options'],
})
export class RailzTransactionsControl {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzVisualizations extends Components.RailzVisualizations {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['configuration', 'filter', 'options'],
})
@Component({
  selector: 'railz-visualizations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['configuration', 'filter', 'options'],
})
export class RailzVisualizations {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
