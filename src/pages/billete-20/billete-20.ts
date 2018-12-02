import { SelectorBilletePage } from './../selector-billete/selector-billete';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Billete_20Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-billete-20',
  templateUrl: 'billete-20.html',
})
export class Billete_20Page {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private screenOrientation: ScreenOrientation) {

      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

      
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Billete_20Page');
  }

  regresar(){
    this.navCtrl.setRoot(SelectorBilletePage);
  }

}
