import { PostAPI } from './post-api';
import { DenominacionAPI } from './denominacion-api';
import { AlertaAPI } from './alerta-api';
import { UsuarioApi } from './usuario-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, ConnectionBackend } from '@angular/http';

/*
  Generated class for the ProviderAppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProviderAppProvider {

  usuarioAPI:UsuarioApi;
  alertaAPI:AlertaAPI;
  denominacionAPI:DenominacionAPI;
  postAPI:PostAPI;

  constructor(public http: Http) {
    console.log('Hello ProviderAppProvider Provider');
    
  }

  setConfig(){
    this.initialize();
  }

  private initialize(){
    this.usuarioAPI = new UsuarioApi(this.http);
    this.alertaAPI = new AlertaAPI(this.http);
    this.denominacionAPI = new DenominacionAPI(this.http);
    this.postAPI = new PostAPI(this.http);
  }

}
