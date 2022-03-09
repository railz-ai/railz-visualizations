import { NgModule } from '@angular/core';

import { HeaderModule } from './header/header.module';
import { VisualizationsModule } from './visualizations/visualizations.module';
import { FormModule } from './form/form.module';

@NgModule({
  imports: [HeaderModule, VisualizationsModule, FormModule],
})
export class ComponentsModule {}
