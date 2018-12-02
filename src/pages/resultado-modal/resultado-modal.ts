import { Denominacion } from './../../_entity/denominacion';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ResultadoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado-modal',
  templateUrl: 'resultado-modal.html',
})
export class ResultadoModalPage {

  resultado:boolean;
  denominacion:Denominacion;
  serie:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public viewCtrl: ViewController) {
    let data = this.navParams.data;
    if(data){
      this.denominacion = data['denominacion'];
      this.resultado = data['resultado'];
      this.serie = data['serie'];
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoModalPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
