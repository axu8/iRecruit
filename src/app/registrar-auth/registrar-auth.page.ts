import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../providers/authentication-service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-auth',
  templateUrl: './registrar-auth.page.html',
  styleUrls: ['./registrar-auth.page.scss'],
})
export class RegistrarAuthPage implements OnInit {

  model: any = {};//Delete This
  //loading = false;
  loading;
	error = '';
	loader;

	constructor (
		private authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    public router: Router
	){ }

  ngOnInit() {
    this.authenticationService.logout();
  }
  login(recCredentials){
		this.error = '';
		//this.loading = true;
		this.presentLoading();
		this.authenticationService.login(recCredentials.userName, recCredentials.userPassword)
		.subscribe(result => {
			console.log(result);
			if(result.status === true){
				//this.navCtrl.parent.select(1);
        //this.navCtrl.push(ShowProspectsPage);
        this.router.navigate(['/registrar-home']);
				//this.navCtrl.setRoot(RecruitHomePage);
				this.loading.dismiss();
			} else {
				this.error = result.message + ' Please Try Again.';
				//this.loading = false;
				this.loading.dismiss();
			}
		});
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait. . .'
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  // private loading: any;
 

  //  from(this.presentLoading())
  //    .pipe(mergeMap(() => this.fetch([])))
  //    .subscribe(() =>  this.loading.dismiss(),
  //                e => {
  //                      this.loading.dismiss();
  //                      this.popup.popExce(e); });
 
//  private async presentLoading(): Promise<any> {
//    this.loading = await this.loadCtrl.create();
//    return await this.loading.present();
//  }
  // async presentLoading() {
  //   // const loadingController = document.querySelector('ion-loading-controller');
  //   //console.log(loadingController);
  //   // await loadingController.componentOnReady();
  
  //   const loadingElement = await loadingController.create({
  //     message: 'Please wait...',
  //     // spinner: 'crescent',
  //     // duration: 2000
  //   });
  //   return await loadingElement.present();
  // }
  // async presentLoading() {
	// 	this.loader = this.loadingCtrl.create({
	// 	  content: "Please wait..."
	// 	});
	// 	this.loader.present();
  // }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad RecruitAuth');
  }

}
