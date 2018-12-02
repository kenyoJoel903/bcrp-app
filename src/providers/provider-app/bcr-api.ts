import { bcrp } from './../../_entity/constantes';
import { hackathonback } from "../../_entity/constantes";
import { Http, Headers, RequestOptions, BaseRequestOptions, ConnectionBackend } from '@angular/http';

export class BCRPAPI{

    urlService = `${bcrp.url_base}`;

    constructor(private _http:Http){

    }

    validar(data:any){
        let headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({
            headers: headers
        });


        let promesa = new Promise((res, rej)=>{
            this._http.post(`${this.urlService}${bcrp.services.valida}`, data, options).toPromise().then(response=>{
                res(response)
            }).catch(error=>{
                rej(error);
            });
        })

        return promesa.then(response=>{
            let _data = JSON.parse(response['_body']);
            return Promise.resolve(_data);
        }).catch(error=>{
            return Promise.reject(error);
        });
    }
}