import { Usuario } from './usuario';
import { Denominacion } from "./denominacion";

export class Alerta{
    id:number;
    fecha:string;
    lugar:string;
    serie:string;
    denominacion:Denominacion;
    usuario:Usuario;
    descripcion:string;
}