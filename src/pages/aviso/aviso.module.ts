import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvisoPage } from './aviso';

@NgModule({
  declarations: [
    AvisoPage,
  ],
  imports: [
    IonicPageModule.forChild(AvisoPage),
  ],
})
export class AvisoPageModule {}
