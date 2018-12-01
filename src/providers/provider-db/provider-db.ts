import { ProviderAlerta } from './provider-alerta';
import { ProviderUsuario } from './provider-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { ProviderDenominacion } from './provider-denominacion';

/*
  Generated class for the ProviderDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProviderDbProvider {

  dataBase:SQLiteObject = null;

  usuarioDAO:ProviderUsuario;
  denominacionDAO:ProviderDenominacion;
  alertaDAO:ProviderAlerta;

  constructor(public http: HttpClient) {
    console.log('Hello ProviderDbProvider Provider');
  }


  setDataBase(db:SQLiteObject){
    if(db){
      this.dataBase = db;
      this.usuarioDAO = new ProviderUsuario(this.dataBase);
      this.denominacionDAO = new ProviderDenominacion(this.dataBase);
      this.alertaDAO = new ProviderAlerta(this.dataBase);
    }
  }

}
