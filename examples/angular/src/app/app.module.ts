import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RailzVisualizationsModule} from "@railzai/railz-visualizations-angular/src";
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [AppComponent, FormComponent, HeaderComponent, ChartsComponent],
  imports: [BrowserModule, RailzVisualizationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
