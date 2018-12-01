import { SQLiteObject } from '@ionic-native/sqlite';
import { Denominacion } from '../../_entity/denominacion';
export class ProviderDenominacion{
    dataBase:SQLiteObject;
    table: string = "denominacion";

    constructor(db:SQLiteObject){
        this.dataBase =db;
    }

    listar(){
        let denominaciones: Array<Denominacion> = [];
        let sql = `SELECT ID, VALOR FROM ${this.table}`;
        return this.dataBase.executeSql(sql)
            .then(response =>{
                for(let i = 0; i< response.rows.length; i++){
                    let deno = response.rows.item(i); 
                    let _deno:Denominacion = {
                        id: deno.id,
                        valor: deno.valor
                    };
                    denominaciones.push(_deno);
                }
                return Promise.resolve(denominaciones);
            }).catch(error=>{
                return Promise.reject(error);
            });
    }

    guardar(deno:Denominacion){
        let sql = `INSERT INTO ${this.table} (ID, VALOR) values (?, ?)` ;
        return this.dataBase.executeSql(sql ,  [deno.id, deno.valor])
            .then(response=>{
                return Promise.resolve(deno);
            }).catch(error=>{
                return Promise.reject(error);
            })
    }

    obtenerPorId(id:number){
        let deno:Denominacion;
        let sql = `SELECT ID, VALOR FROM ${this.table} WHERE ID = ?`;
        return this.dataBase.executeSql(sql, [id])
            .then(response =>{
                for(let i = 0; i< response.rows.length; i++){
                    let _deno = response.rows.item(i); 
                    deno= {
                        id: _deno.id,
                        valor: _deno.valor
                    };
                }
                return Promise.resolve(deno);
            }).catch(error=>{
                return Promise.reject(error);
            })
    }

}