import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { StorageService } from '../providers/storage-service';
import { PinpadComponent } from '../student-form/pinpad/pinpad.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    public storageService: StorageService,
    public router: Router,
    public modalController: ModalController,
  ){

  }
  async presentModal(path) {
    
    const modal = await this.modalController.create({
      backdropDismiss: false,
      component: LoginComponent,
      componentProps: {
        'path': path
      }
    });
    return await modal.present();
  }
  async presentPinpadModal(path) {
    
    const modal = await this.modalController.create({
      component: PinpadComponent,
      componentProps: {
        'path': path
      }
    });
    return await modal.present();
  }
  checkLoginAndGoto(path, mode){
    if( mode == 'student'){
      this.storageService.getCampaign().then( result => {
        
        if (result == null){
          this.presentModal(path);
        } else {
          this.router.navigate([path]);
        }
      });
    } else if( mode == 'recruiter'){
      this.storageService.getUserToken().then( result => {
        
        if (result == null){
          this.presentModal(path);
        } else {
          this.presentPinpadModal(path);
        }
      });
    }
  }
  startProspect(){
    console.log('test');
    this.presentModal('students/student-form');
    //this.router.navigate([url]);
  }
  startRecruiter(){

  }
  /*
  checkLoginAndGoto(url){
    if(){
      this.presentModal(url);
    } else {
      this.router.navigate([url]);
    }
    
  }
  */
}
