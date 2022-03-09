import { NgModule } from '@angular/core';
import { BasicModule } from './basic/basic.module';
import { CustomizationModule } from './customization/customization.module';
import { OthersModule } from './others/others.module';
@NgModule({
  imports: [BasicModule, CustomizationModule, OthersModule],
})
export class PagesModule {}
