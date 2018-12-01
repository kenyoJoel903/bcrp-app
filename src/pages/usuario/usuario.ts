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
  constructor(public navCtrl: NavController, public navParams: NavParams, private dabprovider: ProviderDbProvider,
    private fb:FormBuilder,private apiProvider:ProviderAppProvider) {
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
    this.dabprovider.usuarioDAO.obtenerUsuario()
      .then(res=>{
        this.usuario = res;
      }).catch(error=>{
        this.usuario = {
          id: 0,
          nombres : '',
          apellidos: '',
          email : ''
        }
      })
  }

  private initForm(){
    this.form = this.fb.group({
      'nombres': new FormControl(this.usuario.nombres),
      'apellidos' : new FormControl(this.usuario.apellidos),
      'email' : new FormControl(this.usuario.email)
    });
  }

  private guardar(){
    this.usuario.nombres = this.form.value['nombres'];
    this.usuario.apellidos = this.form.value['apellidos'];
    this.usuario.email = this.form.value['email'];
    this.apiProvider.usuarioAPI.registrar(this.usuario)
      .then(usu=>{
        this.usuario = usu;
        this.dabprovider.usuarioDAO.eliminarTodo()
          .then(res=>{
            if(res == "OK"){
              this.dabprovider.usuarioDAO.guardar(this.usuario);

            }
          })
      })

  }

}
