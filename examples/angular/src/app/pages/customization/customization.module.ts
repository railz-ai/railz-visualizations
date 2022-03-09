import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { VisualizationsModule } from '../../components/visualizations/visualizations.module';

import { FormModule } from '../../components/form/form.module';

import { CustomizationComponent } from './customization.component';

@NgModule({
  declarations: [CustomizationComponent],
  imports: [BrowserModule, VisualizationsModule, FormModule],
  exports: [CustomizationComponent],
})
export class CustomizationModule {}
