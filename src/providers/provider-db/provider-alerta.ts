import { Usuario } from './../../_entity/usuario';
import { Alerta } from './../../_entity/alerta';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Denominacion } from '../../_entity/denominacion';
export class ProviderAlerta{
    dataBase:SQLiteObject;
    table: string = "alerta";

    constructor(db:SQLiteObject){
        this.dataBase =db;
    }

    listarAlertas(){
        let alertas:Array<Alerta>=[];
        let sql = `SELECT A.ID, A.FECHA, A.LUGAR, A.SERIE, A.DENOMINACION AS DENO_ID, A.USUARIO AS USU_ID, 
        U.NOMBRES AS USU_NOMBRES, U.APELLIDOS AS USU_APELLIDOS, U.EMAIL AS USU_EMAIL,
        D.VALOR AS  DENO_VALOR
         FROM ${this.table} A INNER JOIN USUARIO U ON U.ID = A.USUARIO 
         INNER JOIN DENOMINACION D ON D.ID = A.DENOMINACION ORDER BY A.ID DESC`;
         return this.dataBase.executeSql(sql)
            .then(response =>{
                for(let i = 0; i< response.rows.length; i++){
                    let row = response.rows.item(i); 
                    let usu:Usuario = {
                        id: row.USU_ID,
                        apellidos: row.USU_APELLIDOS,
                        nombres: row.USU_NOMBRES,
                        email: row.USU_EMAIL
                    };
                    let deno:Denominacion = {
                        id: row.DENO_ID,
                        valor: row.DENO_VALOR
                    };
                    let alerta:Alerta = {
                        id: row.ID,
                        fecha: row.FECHA,
                        lugar: row.LUGAR,
                        serie: row.SERIE,
                        denominacion : deno,
                        usuario: usu
                    }
                    alertas.push(alerta);
                }
                return Promise.resolve(alertas);
            }).catch(error=>{
                return Promise.reject(error);
            });    
    }

    guardar(alerta:Alerta){
        let sql = `INSERT INTO ${this.table} (ID, FECHA, LUGAR, SERIE, DENOMINAICON, USUARIO) VALUES (?,?,?,?,?,?)`;
        return this.dataBase.executeSql(sql, [alerta.id, alerta.fecha, alerta.lugar, alerta.serie, alerta.denominacion.id, alerta.usuario.id])
            .then(response =>{
                return Promise.resolve(alerta);
            }).catch(error=>{
                return Promise.reject(error);
            })

    }
}