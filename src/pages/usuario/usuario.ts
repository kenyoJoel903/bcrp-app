import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ProviderAppProvider } from './../../providers/provider-app/provider-app';
import { ProviderDbProvider } from './../../providers/provider-db/provider-db';
import { Usuario } from './../../_entity/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  usuario:Usuario;
  form: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dao: ProviderDbProvider,
    private fb:FormBuilder,public api:ProviderAppProvider, private screenOrientation: ScreenOrientation) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.screenOrientation.unlock();
      this.form = this.fb.group({
        'nombres': new FormControl(''),
        'apellidos' : new FormControl(''),
        'email' : new FormControl('')
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioPage');
    this.obtenerUsuario();
  }

  obtenerUsuario(){
    this.dao.usuarioDAO.obtenerUsuario()
      .then(res=>{
        console.log('Usuraio:',res);
        this.usuario = res;
        this.initForm();
      }).catch(error=>{
        console.log(error);
        this.usuario = {
          id: 0,
          nombres : '',
          apellidos: '',
          email : ''
        };
        this.initForm();
      })
  }

  private initForm(){
    this.form = this.fb.group({
      'nombres': new FormControl(this.usuario.nombres),
      'apellidos' : new FormControl(this.usuario.apellidos),
      'email' : new FormControl(this.usuario.email)
    });
  }

  public guardar(){
    this.usuario.nombres = this.form.controls['nombres'].value;
    this.usuario.apellidos = this.form.controls['apellidos'].value;
    this.usuario.email = this.form.controls['email'].value;
    this.api.usuarioAPI.registrar(this.usuario)
      .then(usu=>{
        this.usuario = usu;
        this.dao.usuarioDAO.eliminarTodo()
          .then(res=>{
            if(res == "OK"){
              this.dao.usuarioDAO.guardar(this.usuario);
              

            }
          })
      })

  }

}
