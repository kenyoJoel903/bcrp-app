import { LoadingPage } from './../pages/loading/loading';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { StartPage } from '../pages/start/start';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = StartPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      this.rootPage = HomePage;
      splashScreen.hide();

    });
  }
}

