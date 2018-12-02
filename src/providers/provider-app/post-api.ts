import { Post } from './../../_entity/post';
import { hackathonback } from "../../_entity/constantes";
import { Http, Headers, RequestOptions, BaseRequestOptions, ConnectionBackend } from '@angular/http';

export class PostAPI{
    urlService = `${hackathonback.url_base}${hackathonback.services.posts}`;

    constructor(private _http:Http){

    }


    obtenerPost(id:number){
        let post:Post;

        let promesa = new Promise((res, rej)=>{
            this._http.get(`${this.urlService}/${id}`).toPromise().then(response=>{
                res(response);
            }).catch(error=>{
                rej(error);
            });
        });

        return promesa.then(response =>{
            let _data = JSON.parse(response['_body']);
            post = _data;
            return Promise.resolve(post);
        }).catch(error=>{
            return Promise.reject(error);
        })


    }
}