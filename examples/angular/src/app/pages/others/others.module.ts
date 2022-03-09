import { NgModule } from '@angular/core';
import { OthersComponent } from './others.component';
import { BrowserModule } from '@angular/platform-browser';
import { RailzVisualizationsModule } from '@railzai/railz-visualizations-angular';

@NgModule({
  declarations: [OthersComponent],
  imports: [BrowserModule, RailzVisualizationsModule],
  exports: [OthersComponent],
})
export class OthersModule {}
