import { Denominacion } from './denominacion';

export interface Post{
    denominacion:Denominacion;
    cuerpo:String;
    id:number;
    image:string;
    titulo:string;
    tituloQuechua:string;
    cuerpoQuechua:string;
}