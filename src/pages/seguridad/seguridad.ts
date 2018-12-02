import { Billete_100Page } from './../billete-100/billete-100';
import { Billete_20Page } from './../billete-20/billete-20';
import { ProviderAppProvider } from './../../providers/provider-app/provider-app';
import { Post } from './../../_entity/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SeguridadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seguridad',
  templateUrl: 'seguridad.html',
})
export class SeguridadPage {

  post:Post;
  page:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api:ProviderAppProvider) {

      let data = this.navParams.data;
      let id = data['id'];
      this.page = data['page'];

        this.api.postAPI.obtenerPost(Number(id))
          .then(response=>{
            this.post = response;
          }).catch(error=>{
            this.regresar();
          });
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeguridadPage');
  }

  
  regresar(){
    if(this.page == 'BILLETE20'){
      this.navCtrl.setRoot(Billete_20Page);
    }

    if(this.page == 'BILLETE100'){
      this.navCtrl.setRoot(Billete_100Page);
    }
  }

}
