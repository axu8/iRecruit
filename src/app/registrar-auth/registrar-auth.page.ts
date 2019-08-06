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
		this.presentLoading();
		this.authenticationService.login(recCredentials.userName, recCredentials.userPassword)
		.subscribe(result => {
			console.log(result);
			if(result.status === true){
        this.router.navigate(['/registrar-home']);
				this.loading.dismiss();
			} else {
				this.error = result.message + ' Please Try Again.';
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


  ionViewDidLoad() {
  }

}
