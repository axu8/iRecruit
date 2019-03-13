import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from "../providers/storage-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registrar-home',
  templateUrl: './registrar-home.page.html',
  styleUrls: ['./registrar-home.page.scss'],
})
export class RegistrarHomePage implements OnInit {
  // showProspectsPage = ShowProspectsPage;
	// editProspectsPage = EditProspectsPage;
	// submitProspectsPage = SubmitProspectsPage;
	// home = Home;

	goto(page){
		//this.navCtrl.push(page);
	}
	async confirmExit() {
		let confirm = await this.alertCtrl.create({
			header: 'Back To Home',
			message: 'Are you sure you want to leave the Recruiter Dashboard? You will have to log back in?',
			buttons: [
				{
					text: 'Stay',
					handler: () => {
						console.log('Disagree clicked');
					}
				},
				{
					text: 'Leave',
					handler: () => {
						console.log('Agree clicked');
						//this.navCtrl.setRoot(this.home);
					}
				}
			]
		});
		confirm.present();
	}
  constructor(public router: Router, public alertCtrl: AlertController, public storage: StorageService) {
	}

  test() {
		console.log( this.storage.getUserToken() );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RecruitHome');
	}


  ngOnInit() {
  }

}
