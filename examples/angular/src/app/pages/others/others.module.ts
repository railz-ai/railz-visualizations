import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RailzVisualizationsModule } from '@railzai/railz-visualizations-angular/dist';

import { OthersComponent } from './others.component';

@NgModule({
  declarations: [OthersComponent],
  imports: [BrowserModule, RailzVisualizationsModule],
  exports: [OthersComponent],
})
export class OthersModule {}
