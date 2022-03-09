import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [BrowserModule, RouterModule],
})
export class HeaderModule {}
