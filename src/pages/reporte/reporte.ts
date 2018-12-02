import { Denominacion } from './../../_entity/denominacion';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProviderAppProvider } from './../../providers/provider-app/provider-app';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ResultadoModalPage } from '../resultado-modal/resultado-modal';

/**
 * Generated class for the ReportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reporte',
  templateUrl: 'reporte.html',
})
export class ReportePage {

  form:FormGroup;
  denominaciones:Array<Denominacion> = [];

  billetes = [
    {
        "id": 1,
        "denominacion": "20",
        "numeracion": "C3208927E"
    },
    {
        "id": 2,
        "denominacion": "20",
        "numeracion": "B2942453G"
    },
    {
        "id": 3,
        "denominacion": "20",
        "numeracion": "A9638214J"
    },
    {
        "id": 4,
        "denominacion": "20",
        "numeracion": "A0331602A"
    },
    {
        "id": 5,
        "denominacion": "20",
        "numeracion": "A0239612B"
    },
    {
        "id": 6,
        "denominacion": "100",
        "numeracion": "C4692338D"
    },
    {
        "id": 7,
        "denominacion": "100",
        "numeracion": "C0029425D"
    },
    {
        "id": 8,
        "denominacion": "100",
        "numeracion": "A4590096S"
    },
    {
        "id": 9,
        "denominacion": "100",
        "numeracion": "B4864122A"
    },
    {
        "id": 10,
        "denominacion": "100",
        "numeracion": "A2423134B"
    }
];

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation:ScreenOrientation,
    private fb:FormBuilder,public api:ProviderAppProvider,
    public modalCtrl: ModalController) {

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.screenOrientation.unlock();
    
    this.form = this.fb.group({
      'denominacion' : new FormControl(0),
      'serie' : new FormControl('')
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportePage');
    this.listarDenominaciones();
  }


  private listarDenominaciones(){
    this.api.denominacionAPI.listarDenominaciones()
      .then(response =>{
        this.denominaciones = response;
      });
  }


  consultar(){
    let deno:string = this.form.controls['denominacion'].value ;
    let serie:String = this.form.controls['serie'].value;
    deno = deno + "";
    serie = serie.toLocaleUpperCase();
    console.log(deno, serie);
    /*this.api.bcrAPI.validar({"denominacion":deno, "numeracion":serie})
      .then(res=>{
        if(!res.result){
          this.mostrarResultado(true);
        }else{
          this.mostrarResultado(false);
        }
      }).catch(error=>{
       
      });*/
      let encontrado = false;
      console.log(this.billetes);
      for(let i = 0; i < this.billetes.length; i++){
        console.log(this.billetes[i]);
        if(Number(this.billetes[i].denominacion) == Number(deno) && this.billetes[i].numeracion == serie){
           encontrado = true;
        }
      }
      if(encontrado){
        this.mostrarResultado(false);
      }else{
        this.mostrarResultado(true);
      }
  }

  private mostrarResultado(res:boolean){
    let serie = this.form.controls['serie'].value;;
    let denominacion :Denominacion;
    this.denominaciones.forEach(d=>{
      if(d.valor == this.form.controls['denominacion'].value){
        denominacion = d;
      }
    });
    let resultado = {
      'denominacion':denominacion,
      'resultado': res,
      'serie': serie
    };
    let modal = this.modalCtrl.create(ResultadoModalPage, resultado);
    modal.present({ keyboardClose:false});


  }

}
