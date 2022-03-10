/* tslint:disable */
/* auto-generated angular directive proxies */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
} from "@angular/core";
import { ProxyCmp, proxyOutputs } from "./angular-component-lib/utils";

import { Components } from "@railzai/railz-visualizations";

export declare interface RailzErrorImage extends Components.RailzErrorImage {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ["fillColor", "statusCode", "textColor"],
})
@Component({
  selector: "railz-error-image",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content></ng-content>",
  inputs: ["fillColor", "statusCode", "textColor"],
})
export class RailzErrorImage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzLoading extends Components.RailzLoading {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ["fillColor", "loadingText", "textColor"],
})
@Component({
  selector: "railz-loading",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content></ng-content>",
  inputs: ["fillColor", "loadingText", "textColor"],
})
export class RailzLoading {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzProgressBar extends Components.RailzProgressBar {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: [
    "options",
    "overdueAmount",
    "paidAmount",
    "reportType",
    "unpaidAmount",
  ],
})
@Component({
  selector: "railz-progress-bar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content></ng-content>",
  inputs: [
    "options",
    "overdueAmount",
    "paidAmount",
    "reportType",
    "unpaidAmount",
  ],
})
export class RailzProgressBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzStatementsChart
  extends Components.RailzStatementsChart {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ["configuration", "content", "filter", "options"],
})
@Component({
  selector: "railz-statements-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content></ng-content>",
  inputs: ["configuration", "content", "filter", "options"],
})
export class RailzStatementsChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzTransactionsControl
  extends Components.RailzTransactionsControl {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ["configuration", "content", "filter", "options"],
})
@Component({
  selector: "railz-transactions-control",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content></ng-content>",
  inputs: ["configuration", "content", "filter", "options"],
})
export class RailzTransactionsControl {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface RailzVisualizations
  extends Components.RailzVisualizations {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ["configuration", "content", "filter", "options"],
})
@Component({
  selector: "railz-visualizations",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content></ng-content>",
  inputs: ["configuration", "content", "filter", "options"],
})
export class RailzVisualizations {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
