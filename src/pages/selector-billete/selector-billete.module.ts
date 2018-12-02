import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectorBilletePage } from './selector-billete';

@NgModule({
  declarations: [
    SelectorBilletePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectorBilletePage),
  ],
})
export class SelectorBilletePageModule {}
