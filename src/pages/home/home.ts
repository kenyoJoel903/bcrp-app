import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AvisoPage } from './../aviso/aviso';
import { StartPage } from './../start/start';
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
import { SelectorBilletePage } from '../selector-billete/selector-billete';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;
  appMenuItems: Array<MenuItem>;
  userReady: Boolean = false;
  loadReady: Boolean = false;


  constructor(public navCtrl: NavController, public loading: LoadingController, public menuCtl: MenuController,
    private sqlite:SQLite,
    public dao:ProviderDbProvider, public nativeStorage: NativeStorage,
    private file:File, public api:ProviderAppProvider, private screenOrientation: ScreenOrientation) {

      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
      
    this.menuCtl.enable(true);
    this.appMenuItems = [
      {title: 'Billetes', component : SelectorBilletePage, icon: 'cash'},
      {title: 'Alertas', component: AlertaPage, icon: 'notifications'},
      //{title: 'Escanea tu billete', component: ScanerPage, icon: 'qr-scanner'},
      {title: 'Reporta billetes', component: ReportePage, icon: 'sad'},
      //{title: 'Cambiar idioma', component: ReportePage, icon: 'cog'},
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
    this.api.setConfig();
  }

  private validarSessiones(){
    let that = this;
    let loader = this.loading.create({
      content: 'Iniciando...'
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
    console.log('iniciar vista');
    let that = this;
    that.nativeStorage.getItem("usuario")
      .then(data=>{
        if(data.id){
          that.nav.setRoot(AvisoPage)
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
    console.log('inciar bd');
    this.file.checkFile(this.file.applicationDirectory, 'databases/app.db')
      .then(data =>{
        this.initDataBase();
      }).catch(error=>{
        this.copydataBase().then(res=>{
          this.initDataBase();
        })
      })
    1//this.iniciarVista();
  }

  private initDataBase(){
    let that = this;
    this.sqlite.create({
      name: 'app.db',
      location: 'default'
    }).then(db=>{
      this.dao.setDataBase(db);
      this.api.denominacionAPI.listarDenominaciones()
        .then(resp =>{
          let denonimaciones:Array<Denominacion> = resp || [];
          denonimaciones.forEach(d=>{
            this.dao.denominacionDAO.guardar(d);
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
    this.nav.setRoot(AvisoPage, {}, {keyboardClose: false})
      .then(data =>{
        console.log(data);
      }).catch(error=>{
        console.error(error);
      });
  }

  private copydataBase(){
    return this.file.checkFile(this.file.applicationDirectory, 'www/assets/database/app.sqlite').then(data => {
      this.file.copyFile(this.file.applicationDirectory + '/www/assets/database/', 'app.sqlite', this.file.applicationStorageDirectory + '/databases/', 'app.db').then(
        succes => {
          return Promise.resolve("database copied!");
        }
      ).catch(error => {
        return Promise.resolve(error);
      })
    }).catch(error => {
      console.log(error);
    });

  }

}
