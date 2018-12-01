import { Usuario } from './../../_entity/usuario';
import { hackathonback } from './../../_entity/constantes';
import { Http, Headers, RequestOptions, BaseRequestOptions, ConnectionBackend } from '@angular/http';

export class UsuarioApi{

    urlService = `${hackathonback.url_base}${hackathonback.services.usuarios}`;

    constructor(private _http:Http){

    }

    registrar(usuario:Usuario){

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({
            headers: headers
        });

        let promesa = new Promise((res, rej)=>{
            this._http.post(this.urlService, usuario, options).toPromise().then(response =>{
                res(response);
            }).catch(error=>{
                rej(error);
            })
        });

        return promesa.then(response =>{
            let _data = JSON.parse(response['_body']);
            console.log(_data);
            usuario = _data;
            return Promise.resolve(usuario);
        }).catch(error=>{
            return Promise.reject(error);
        })
        
    }
}