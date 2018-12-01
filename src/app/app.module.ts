import { UsuarioPage } from './../pages/usuario/usuario';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertaPage } from './../pages/alerta/alerta';
import { LoadingPage } from './../pages/loading/loading';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SQLite } from '@ionic-native/sqlite';
import { HTTP } from '@ionic-native/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScanerPage } from '../pages/scaner/scaner';
import { ReportePage } from '../pages/reporte/reporte';
import { ProviderDbProvider } from '../providers/provider-db/provider-db';
import { ProviderAppProvider } from '../providers/provider-app/provider-app';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoadingPage,
    AlertaPage,
    ScanerPage,
    ReportePage,
    UsuarioPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoadingPage,
    AlertaPage,
    ScanerPage,
    ReportePage,
    UsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProviderDbProvider,
    NativeStorage,
    File,
    HTTP,
    ProviderAppProvider
  ]
})
export class AppModule {}
