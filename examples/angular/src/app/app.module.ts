import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FormModule} from "./components/form/form.module";
import {RailzVisualizationsModule} from "@railzai/railz-visualizations-angular/dist";
import {BasicComponent} from './pages/basic/basic.component';
import {CustomizationComponent} from './pages/customization/customization.component';
import {RouterModule} from "@angular/router";
import { OthersComponent } from './pages/others/others.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, BasicComponent, CustomizationComponent, OthersComponent],
    imports: [BrowserModule, FormModule, RailzVisualizationsModule,
        RouterModule.forRoot([
            {path: 'basic', component: BasicComponent},
            {path: 'customization', component: CustomizationComponent},
            {path: 'others', component: OthersComponent},
            {path: '', redirectTo: '/basic', pathMatch: 'full'},
        ]), RailzVisualizationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {
}
