import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SelectorBilletePage } from './../selector-billete/selector-billete';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AvisoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aviso',
  templateUrl: 'aviso.html',
})
export class AvisoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation) {

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisoPage');
  }

  continuar(){
    this.navCtrl.setRoot(SelectorBilletePage);
  }

}
