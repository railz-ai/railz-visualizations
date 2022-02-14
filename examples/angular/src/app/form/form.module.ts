import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormComponent } from './form.component';
import {FilterFormComponent} from "./elements/filter-form/filter-form.component";
import {AuthFormComponent} from "./elements/auth-form/auth-form.component";

@NgModule({
  declarations: [ FormComponent, FilterFormComponent, AuthFormComponent],
  imports: [BrowserModule],
})
export class FormModule {}
