import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Data } from './providers/data';
import { AuthenticationService } from './providers/authentication-service';
import { SubmitProspectService } from './providers/submit-prospect-service';
import { StorageService } from './providers/storage-service';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { BrochureSidebarComponent } from './brochure-sidebar/brochure-sidebar.component';
import { StudentFormPageModule } from './student-form/student-form.module';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { PinpadPageModule } from './pinpad/pinpad.module';

@NgModule({
  declarations: [
    AppComponent,
    MainSidebarComponent,
    BrochureSidebarComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    StudentFormPageModule,
    FormsModule,
    ReactiveFormsModule,
    PinpadPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Data,
    AuthenticationService,
    SubmitProspectService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
