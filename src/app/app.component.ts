import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WordpressService  } from './providers/wordpress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  recruiterLoggedIn = false;

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
    public router: Router
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
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
