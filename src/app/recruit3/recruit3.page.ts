import { Component, OnInit } from '@angular/core';
import { StorageService } from '../providers/storage-service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { SubmitProspectService } from '../providers/submit-prospect-service';
import { Observable, from } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-recruit3',
  templateUrl: './recruit3.page.html',
  styleUrls: ['./recruit3.page.scss'],
})
export class Recruit3Page implements OnInit {
  message = '';
  messages:any = [];
  prospects: any = [];
  prospectsConstuctor: any = [];
  prospectsOnInit: any = [];
  loading;
  submissionDone = false;
  progress:any;
  constructor(
    public storageService: StorageService,
    public spService: SubmitProspectService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    // this.storageService.prospectData.subscribe((data) => {
    //   this.prospectsConstuctor = data;
    //   console.log("constructor", this.prospectsConstuctor);
    // });
  }
  ngOnInit() {
    // this.storageService.prospectData.subscribe((data) => {
    //   this.prospects = data;
    //   console.log("onInit", this.prospectsOnInit);
    // });
  }
  ionViewDidEnter(){
    this.storageService.getAllProspects().then(p => {
      this.prospects = p;
      console.log(this.prospects);
    });
  }
  
  async presentLoading(m) {
    this.loading = await this.loadingController.create({
      message: m
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Done!',
      duration: 1000,
    });
    toast.onDidDismiss().then(()=>{
      this.presentRefreshToast();
    });
    toast.present();
  }
  async presentRefreshToast() {
    const toast = await this.toastController.create({
      header: 'Prospects will be Deleted',
      message: 'What would you like to do?',
      // position: 'top',
      buttons: [
        {
          // side: 'start',
          // icon: 'star',
          text: 'Clear And Refresh',
          handler: () => {
            console.log('Refresh clicked');
          }
        }, {
          text: 'Save Report',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }


  sendProspects(){
    this.submissionDone = true;
    console.log(this.prospects);
		this.message = '';
    
    this.prospects.forEach((prsp,i) => {
      this.spService.submit(this.prospects, i).then(async result => {
        //console.log(result);
        this.message = 'Sending Prospect ' + String(i+1) + ' of ' + String(this.prospects.length) + '\r\n';
        this.progress = (i+1) / (this.prospects.length);
        //this.presentLoading('Sending Prospect ' + String(i+1) + ' of ' + String(this.prospects.length) );
        await result.subscribe(p => {
          this.messages.push(
            {
              prospectNo: i,
              message: p.Messages[0].Message,
              status: p.Status,
              prospectData: this.prospects[i]
            }
          );

          //debugger;
          if( (i+1) === this.prospects.length){
            this.presentToast();
            this.message = "Submissions Report";
            // this.submissionDone = true;
          }
          
          // this.loading.dismiss();
          // if(p.status === true){
          //    this.message += p.message + '\r\n';
          //   console.log(p);
          // } else {
          //   this.message += p.message + '\r\n';
          //   console.log(p);
          // }
        });
      });
    });
    
		// from(this.spService.submit(this.prospects)).subscribe(result => {
		// 	result.subscribe(p => {
    //     if(p.status === true){
    //       this.loading.dismiss();
    //       console.log(p);
    //     } else {
    //       this.message = p.message;
    //       this.loading.dismiss();
    //       console.log(p);
    //     }
    //   });
			
    // });
  }
  // submitProspects(){
	// 	this.message = '';
	// 	this.presentLoading();
	// 	this.spService.send().subscribe(result => {
	// 		console.log(result);
	// 		if(result.status === true){
	// 			this.loading.dismiss();
	// 		} else {
	// 			this.message = result.message;
	// 			this.loading.dismiss();
	// 		}
  //   });
  // }
}
