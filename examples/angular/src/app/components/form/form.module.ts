import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AceEditorModule } from 'ng2-ace-editor';

import { ApiService } from '../../../services/api';

import { FormComponent } from './form.component';
import { FilterFormComponent } from './elements/filter-form/filter-form.component';
import { AuthFormComponent } from './elements/auth-form/auth-form.component';

import { OptionsFormComponent } from './elements/options-form/options-form.component';

@NgModule({
  declarations: [FormComponent, FilterFormComponent, AuthFormComponent, OptionsFormComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, AceEditorModule],
  exports: [FormComponent],
  providers: [ApiService],
})
export class FormModule {}
