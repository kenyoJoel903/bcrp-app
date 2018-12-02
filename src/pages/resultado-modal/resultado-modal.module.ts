import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultadoModalPage } from './resultado-modal';

@NgModule({
  declarations: [
    ResultadoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultadoModalPage),
  ],
})
export class ResultadoModalPageModule {}
