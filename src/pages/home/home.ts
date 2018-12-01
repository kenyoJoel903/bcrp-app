import { Denominacion } from './../../_entity/denominacion';
import { ProviderAppProvider } from './../../providers/provider-app/provider-app';
import { UsuarioPage } from './../usuario/usuario';
import { ProviderDbProvider } from './../../providers/provider-db/provider-db';
import { SQLite } from '@ionic-native/sqlite';
import { LoadingPage } from './../loading/loading';
import { ReportePage } from './../reporte/reporte';
import { AlertaPage } from './../alerta/alerta';
import { MenuItem } from './../../_entity/menu-item';
import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, LoadingController, MenuController } from 'ionic-angular';
import { ScanerPage } from '../scaner/scaner';
import { NativeStorage } from '@ionic-native/native-storage';
import { File } from '@ionic-native/file';

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


  constructor(public navCtrl: NavController, public loading: LoadingController, public menuCtl: MenuController,
    private sqlite:SQLite,
    private collectorDB:ProviderDbProvider, public nativeStorage: NativeStorage,
    private file:File, private appProvider:ProviderAppProvider) {
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

  iniciarVista(){
    let that = this;
    that.nativeStorage.getItem("usuario")
      .then(data=>{
        if(data.id){
          that.nav.setRoot(AlertaPage)
            .then(data=>{
              that.loadReady = true;
            }).catch(error=>{
              console.log(error);
            });
        }else{
          that.gotoUsuarioPage();
        }
      }).catch(errro=>{
        that.gotoUsuarioPage();
      });
    
    
  }

  private crearBaseDatos(){
    this.file.checkFile(this.file.applicationDirectory, 'databases/app.db')
      .then(data =>{
        this.initDataBase();
      })
    this.iniciarVista();
  }

  private initDataBase(){
    let that = this;
    this.sqlite.create({
      name: 'app.db',
      location: 'default'
    }).then(db=>{
      this.collectorDB.setDataBase(db);
      this.appProvider.denominacionAPI.listarDenominaciones()
        .then(resp =>{
          let denonimaciones:Array<Denominacion> = resp || [];
          denonimaciones.forEach(d=>{
            this.collectorDB.denominacionDAO.guardar(d);
          })
        })
      that.loadReady = true;
      this.iniciarVista();
    }).catch(error=>{
      console.log('Error en iniciar db', error);
    })
  }

  private gotoUsuarioPage(){
    this.loadReady = true;
    this.nav.setRoot(UsuarioPage, {}, {keyboardClose: false})
      .then(data =>{
        console.log(data);
      }).catch(error=>{
        console.error(error);
      });
  }

}
