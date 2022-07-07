import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RailzVisualizationsModule } from '@railzai/railz-visualizations-angular';

import { AppComponent } from './app.component';
import { BasicComponent } from './pages/basic/basic.component';
import { CustomizationComponent } from './pages/customization/customization.component';
import { OthersComponent } from './pages/others/others.component';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { HeaderModule } from './components/header/header.module';
import { AngJsoneditorModule } from '@maaxgr/ang-jsoneditor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PagesModule,
    ComponentsModule,
    RouterModule.forRoot([
      { path: 'basic', component: BasicComponent },
      { path: 'customization', component: CustomizationComponent },
      { path: 'others', component: OthersComponent },
      { path: '', redirectTo: '/basic', pathMatch: 'full' },
    ]),
    HeaderModule,
    RailzVisualizationsModule,
    AngJsoneditorModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
