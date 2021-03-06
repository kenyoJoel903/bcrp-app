import { SeguridadPage } from './../seguridad/seguridad';
import { SelectorBilletePage } from './../selector-billete/selector-billete';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Billete_100Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-billete-100',
  templateUrl: 'billete-100.html',
})
export class Billete_100Page {

  cuadrantesFront:any={};
  cuadrantesBack:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private screenOrientation: ScreenOrientation) {

      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.cuadrantesFront = {
        c1: { inicio: { x: 0, y : 0}, fin: {x:48, y:46}, id : 5},
        c2: { inicio: { x: 73, y : 0}, fin: {x:127, y:48}, id: 777},
        c3: { inicio: { x: 160, y : 44}, fin: {x:202, y:80}, id: 777},
        c4: { inicio: { x: 31, y : 77}, fin: {x:72, y:112}, id: 1},
        c5: { inicio: { x: 117, y : 72}, fin: {x:159, y:113}, id : 3},
        c6: { inicio: { x: 400, y : 163}, fin: {x:415, y:118}, id: 777},
        c7: { inicio: { x: 158, y : 168}, fin: {x:204, y:200}, id: 777},
        c8: { inicio: { x: 327, y : 161}, fin: {x:371, y:200}, id: 777},
        c9: { inicio: { x: 379, y : 164}, fin: {x:413, y:200}, id: 777},
      };

      this.cuadrantesBack = {
        c1: { inicio: { x: 76, y : 0}, fin: {x:123, y:46}, id : 777},
        c2: { inicio: { x: 390, y : 0}, fin: {x:434, y:39}, id: 777},
        c3: { inicio: { x: 364, y : 84}, fin: {x:404, y:118}, id: 777}
      };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Billete_100Page');
  }

  regresar(){
    this.navCtrl.setRoot(SelectorBilletePage);
  }

  front(event:any){
    console.log(event);
    let x = Number(event.offsetX);
    let y = Number(event.offsetY);
    let _cuadIndex = this.obtenerCuadrante(this.cuadrantesFront, x, y);
    console.log(_cuadIndex);

    this.navCtrl.push(SeguridadPage, {'id': this.cuadrantesFront[_cuadIndex]['id'], 'page': 'BILLETE100' }, {keyboardClose:false});
  }

  back(event:any){
    let x = Number(event.offsetX);
    let y = Number(event.offsetY);
    let _cuadIndex = this.obtenerCuadrante(this.cuadrantesBack, x, y);
    console.log(_cuadIndex);
    this.navCtrl.push(SeguridadPage, {'id': this.cuadrantesBack[_cuadIndex]['id'], 'page': 'BILLETE100' }, {keyboardClose:false});
  }

  private obtenerCuadrante(cuadrante:any, x:number, y:number){
    let _cuadrante = "";
    for(let index in cuadrante){
      let cua = cuadrante[index];
      if(x >=cua['inicio']['x'] && x <= cua['fin']['x'] && y >=cua['inicio']['y'] && y <= cua['fin']['y']){
        _cuadrante = index;
        break;
      }
    }
    return _cuadrante;
  }

}
