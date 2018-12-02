import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ProviderDbProvider } from './../../providers/provider-db/provider-db';
import { ProviderAppProvider } from './../../providers/provider-app/provider-app';
import { Alerta } from './../../_entity/alerta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AlertaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alerta',
  templateUrl: 'alerta.html',
})
export class AlertaPage {

  alertas:Array<Alerta>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private appProvider:ProviderAppProvider,
    private providerdb:ProviderDbProvider, private screenOrientation: ScreenOrientation) {

      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertaPage');
    this.obtenerUltimasAlertas();
  }

 

  obtenerUltimasAlertas(){
    let lastId = 0;
    this.appProvider.alertaAPI.listarAlertas(0)
      .then(res=>{
        this.alertas = res;
      }).catch(error=>{
        this.alertas = [];
      });
  }

}
