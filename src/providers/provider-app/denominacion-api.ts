import { Denominacion } from './../../_entity/denominacion';
import { hackathonback } from "../../_entity/constantes";
import { Http, Headers, RequestOptions, BaseRequestOptions, ConnectionBackend } from '@angular/http';

export class DenominacionAPI{
    urlService = `${hackathonback.url_base}${hackathonback.services.denominaciones}`;

    constructor(private _http:Http){

    }

    listarDenominaciones(){
        let denominaciones:Array<Denominacion>= [];
        let promise = new Promise((res, rej)=>{
            this._http.get(this.urlService).toPromise().then(response=>{
                res(response);
            }).catch(error=>{
                rej(error);
            })
        });

        return promise.then(response =>{
            let _data = JSON.parse(response['_body']);
            console.log(_data);
            denominaciones = _data;
            return Promise.resolve(denominaciones);
        }).catch(error=>{
            return Promise.reject(denominaciones);
        })
 
    }
}