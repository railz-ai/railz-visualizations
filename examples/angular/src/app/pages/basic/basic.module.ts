import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { VisualizationsModule } from '../../components/visualizations/visualizations.module';

import { FormModule } from '../../components/form/form.module';

import { BasicComponent } from './basic.component';

@NgModule({
  declarations: [BasicComponent],
  imports: [BrowserModule, VisualizationsModule, FormModule],
  exports: [BasicComponent],
})
export class BasicModule {}
