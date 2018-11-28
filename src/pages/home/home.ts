import { LoadingPage } from './../loading/loading';
import { ReportePage } from './../reporte/reporte';
import { AlertaPage } from './../alerta/alerta';
import { MenuItem } from './../../_entity/menu-item';
import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, LoadingController, MenuController } from 'ionic-angular';
import { ScanerPage } from '../scaner/scaner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoadingPage;
  appMenuItems: Array<MenuItem>;
  userReady: Boolean = false;
  loadReady: Boolean = false;


  constructor(public navCtrl: NavController, public loading: LoadingController, public menuCtl: MenuController) {
    this.menuCtl.enable(true);
    this.appMenuItems = [
      {title: 'Alertas', component: AlertaPage, icon: 'alert'},
      {title: 'Escanea tu billete', component: ScanerPage, icon: 'qr-scanner'},
      {title: 'Reporta billetes', component: ReportePage, icon: 'sad'},
      {title: 'Cambiar idioma', component: ReportePage, icon: 'cog'},
    ];
    this.loadReady = false;
  }

  openPage(menuItem:MenuItem){
    this.nav.setRoot(menuItem.component);
  }

  exitApp(){
    this.exitApp();
  }

  ionViewDidLoad(){
    this.validarSessiones();
  }

  private validarSessiones(){
    let that = this;
    let loader = this.loading.create({
      content: 'Verificando sessiones iniciadas'
    });
    loader.present().then(()=>{
      if(that.loadReady){
        this.iniciarVista();
      }else{
        this.crearBaseDatos();
      }
      loader.dismiss();
    });
  }

  private iniciarVista(){
    let that = this;
    that.nav.setRoot(AlertaPage)
      .then(res=>{
        that.loadReady = true;
      });
    
  }

  private crearBaseDatos(){
    this.iniciarVista();
  }

}
