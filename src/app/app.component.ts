import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WordpressService  } from './providers/wordpress.service';
import { Router } from '@angular/router';
import { StorageService } from './providers/storage-service';
import { LoginComponent } from './login/login.component';
import { PinpadComponent } from './student-form/pinpad/pinpad.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  recruiterLoggedIn = false;
  globalPath: string;

  public sideMenuPages = [
    {
      title: 'Welcome',
      url: '/students/home',
      icon: 'list'
    },
    {
      title: 'Culture',
      url: '/students/culture',
      icon: 'list'
    },
    {
      title: 'Request Info',
      url: '/students/form',
      icon: 'list'
    },
    {
      title: 'Illustration',
      url: '/students/illustration',
      icon: 'list'
    },
    {
      title: 'Web Design',
      url: '/students/web',
      icon: 'list'
    },
    {
      title: 'Videography',
      url: '/students/video',
      icon: 'list'
    },
    {
      title: 'Graphic Design',
      url: '/students/graphic',
      icon: 'list'
    },
    {
      title: 'Photography',
      url: '/students/photo',
      icon: 'list'
    },
  ];

  public recruiterMenuPages = [
    {
      title: 'Recruiters Home',
      url: 'recruiters/registrar-auth',
      icon: 'list'
    },
  ];

  public pages:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private wp: WordpressService,
    public router: Router,
    public storageService: StorageService,
    public modalController: ModalController
  ) {
    this.retrievePages();
    this.initializeApp();
  }
  retrievePages(){
    this.wp.retrievePages().subscribe(results => {
      this.pages = results;
    });
  }
  goHome(){
    this.router.navigate(['']);
  }
  gotoPage(link){
    this.router.navigate([link]);
  }
  showPage(pageID){
    this.router.navigate(['students/page', pageID]);
  }
  showDegreePage(pageID,gallery,curriculum){
    this.router.navigate(['students/degree-page', pageID, gallery, curriculum]);
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
    this.globalPath = path;
    const modal = await this.modalController.create({
      component: PinpadComponent,
      componentProps: {
        'path': path
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned);
      if (dataReturned.data == true ) {
        this.router.navigate([this.globalPath]);
        //this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
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
          this.globalPath = path;
        }
      });
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
