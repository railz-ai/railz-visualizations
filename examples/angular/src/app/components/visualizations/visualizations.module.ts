import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RailzVisualizationsModule } from '@railzai/railz-visualizations-angular/dist';

import { VisualizationsComponent } from './visualizations.component';

@NgModule({
  declarations: [VisualizationsComponent],
  imports: [BrowserModule, RailzVisualizationsModule],
  exports: [VisualizationsComponent],
})
export class VisualizationsModule {}
