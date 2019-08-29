import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../providers/authentication-service';
import { Router } from '@angular/router';
import { LoadingController, NavParams, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../providers/storage-service';
import { navigationCancelingError } from '@angular/router/src/shared';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  model: any = {};//Delete This
  //loading = false;
  loading;
	error = '';
  loader;
  navParams;

	constructor (
    navParams: NavParams,
		private authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    public router: Router,
    public alertController: AlertController,
    private storageService: StorageService,
    public modalController: ModalController
	){ 
    this.navParams = navParams;
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login(recCredentials){
		this.error = '';
		this.presentLoading();
		this.authenticationService.login(recCredentials.userName, recCredentials.userPassword)
		.subscribe(result => {
      this.loading.dismiss();
			//console.log(result);
			if(result.status === true){
        //this.router.navigate(['/registrar-home']);

        this.presentLoading();
        this.modalController.dismiss();
        //console.log(this.storageService.getUserToken());
        this.storageService.getCampaign().then( c => {
          this.loading.dismiss();
          if (c == null){
            this.presentAlertPrompt();
          } else {
            console.log(this.navParams.get('path'));
            this.router.navigate([this.navParams.get('path')]);
            // this.modalController.dismiss();
          }
          console.log('Current Campaign is: ' + result);
        });
        
        
			} else {
				this.error = result.message + ' Please Try Again.';
				//this.loading.dismiss();
			}
		});
  }
  cancelLogin(){
    this.modalController.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait. . .'
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'New Campaign',
      message: 'Please Assign a Name for This Campaign',
      //subHeader: 'This campaign will be active until you logout.',
      inputs: [
        {
          name: 'campaign',
          type: 'text',
          placeholder: 'Campaign Name'
        },
      ],
      buttons: [
        {
          text: 'Create Campaign',
          handler: (data) => {
            this.storageService.setCampaign(data.campaign);
            this.router.navigate([this.navParams.get('path')]);
            this.modalController.dismiss();
            console.log('Nav Path: ' + this.navParams.get('path'));
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }


}
