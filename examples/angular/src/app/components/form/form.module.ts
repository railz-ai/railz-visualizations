import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormComponent} from './form.component';
import {FilterFormComponent} from "./elements/filter-form/filter-form.component";
import {AuthFormComponent} from "./elements/auth-form/auth-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../../../services/api";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [FormComponent, FilterFormComponent, AuthFormComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    FormComponent
  ],
  providers: [ApiService]
})
export class FormModule {
}
