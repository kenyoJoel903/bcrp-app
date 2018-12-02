import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Billete_100Page } from './../billete-100/billete-100';
import { Billete_20Page } from './../billete-20/billete-20';
import { ProviderAppProvider } from './../../providers/provider-app/provider-app';
import { Denominacion } from './../../_entity/denominacion';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectorBilletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selector-billete',
  templateUrl: 'selector-billete.html',
})
export class SelectorBilletePage {

  denominaciones:Array<Denominacion>= [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api:ProviderAppProvider, private screenOrientation:ScreenOrientation) {


      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.screenOrientation.unlock();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectorBilletePage');
    this.obtenerDenominaciones();
  }

  obtenerDenominaciones(){
    this.api.denominacionAPI.listarDenominaciones()
      .then(response =>{
        this.denominaciones = response;
      });
  }

  open(den:Denominacion){
    if(den.valor == '20'){
      this.navCtrl.setRoot(Billete_20Page);
    }

    if(den.valor == '100'){
      this.navCtrl.setRoot(Billete_100Page);
    }
  }

}
