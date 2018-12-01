import { Usuario } from './../../_entity/usuario';
import { SQLiteObject } from '@ionic-native/sqlite';


export class ProviderUsuario{
    dataBase:SQLiteObject;
    table: string = "usuario";

    constructor(db:SQLiteObject){
        this.dataBase =db;
    }

    obtenerUsuario(){
        let usuario:Usuario;
        let query = "SELECT id, apellidos, nombres, email FROM " + this.table;
        return this.dataBase.executeSql(query)
            .then(response =>{
                for(let i = 0; i< response.rows.length; i++){
                    let _usu = response.rows.item(i); 
                    usuario = {
                        id: _usu.id,
                        nombres: _usu.nombres,
                        apellidos: _usu.apellidos,
                        email: _usu.email
                    };
                }
                return Promise.resolve(usuario);
            }).catch(error=>{
                return Promise.reject(error);
            });
    }

    guardar(usu:Usuario){
        let query = `INSERT INTO ${this.table} (id, apellidos, nombres, email ) values (?,?,?,?)`;
        return this.dataBase.executeSql(query, [usu.id, usu.apellidos, usu.nombres, usu.email])
            .then(response=>{
                return Promise.resolve(usu);
            }).catch(error=>{
                return Promise.reject(usu);
            });
    }

    eliminarTodo(){
        let query = `Delete from ${this.table}`;
        return this.dataBase.executeSql(query, [])
            .then(response =>{
                return Promise.resolve("OK");
            }).catch(error=>{
                return Promise.reject(error);
            })
    }
}