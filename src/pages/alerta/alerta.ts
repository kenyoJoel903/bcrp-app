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
  }

  private listarAlertas(){
    this.providerdb.alertaDAO.listarAlertas()
      .then(response=>{
        this.alertas = response;
        this.obtenerUltimasAlertas();
      })
  }

  obtenerUltimasAlertas(){
    let lastId = 0;
    if(this.alertas.length > 0){
      lastId = this.alertas[0].id;
    }
    this.appProvider.alertaAPI.listarAlertas(lastId)
      .then(_alertas=>{
        _alertas.forEach(a=>{
          this.providerdb.alertaDAO.guardar(a)
            .then(res=>{
              this.alertas.push(res);
            })
        })
      })
  }

}
