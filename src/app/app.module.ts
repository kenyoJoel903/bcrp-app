import { AlertaPage } from './../pages/alerta/alerta';
import { LoadingPage } from './../pages/loading/loading';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScanerPage } from '../pages/scaner/scaner';
import { ReportePage } from '../pages/reporte/reporte';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoadingPage,
    AlertaPage,
    ScanerPage,
    ReportePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoadingPage,
    AlertaPage,
    ScanerPage,
    ReportePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
