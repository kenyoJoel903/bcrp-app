import { Alerta } from './../../_entity/alerta';
import { hackathonback } from "../../_entity/constantes";
import { Http, Headers, RequestOptions, BaseRequestOptions, ConnectionBackend } from '@angular/http';

export class AlertaAPI{
    urlService = `${hackathonback.url_base}${hackathonback.services.alertas}`;

    constructor(private _http:Http){

    }


    listarAlertas(lastId:number){
        let alertas:Array<Alerta> = [];
        let promesa = new Promise((res, rej)=>{
            this._http.get(`${this.urlService}/${lastId}`).toPromise()
                .then(response =>{
                    res(response);
                }).catch(error=>{
                    rej(error);
                });
        })

        return promesa.then(response =>{
            let _data = JSON.parse(response['_body']);
            console.log(_data);
            alertas = _data;
            return Promise.resolve(alertas);
        }).catch(error=>{
            return Promise.reject(alertas);
        })

    }

    guardarAlerta(alerta:Alerta){

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({
            headers: headers
        });

        let promesa = new Promise((res, rej)=>{
            this._http.post(`${this.urlService}`, alerta, options).toPromise()
                .then(response =>{
                    res(response);
                }).catch(error=>{
                    rej(error);
                })
        });

        return promesa.then(response =>{
            let _data = JSON.parse(response['_body']);
            console.log(_data);
            alerta = _data;
            return Promise.resolve(alerta);
        }).catch(error=>{
            return Promise.reject(alerta);
        })

   
    }
}