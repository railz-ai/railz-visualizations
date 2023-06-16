import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../../../services/api';

import { FormComponent } from './form.component';
import { FilterFormComponent } from './elements/filter-form/filter-form.component';
import { AuthFormComponent } from './elements/auth-form/auth-form.component';

import { OptionsFormComponent } from './elements/options-form/options-form.component';
import { AngJsoneditorModule } from '@maaxgr/ang-jsoneditor';

@NgModule({
  declarations: [FormComponent, FilterFormComponent, AuthFormComponent, OptionsFormComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, AngJsoneditorModule],
  exports: [FormComponent],
  providers: [ApiService],
})
export class FormModule {}
