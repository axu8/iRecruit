import { Component, OnInit } from '@angular/core';
import { StorageService } from '../providers/storage-service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { SubmitProspectService } from '../providers/submit-prospect-service';
import { Observable, from } from 'rxjs';
import { debug } from 'util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recruit3',
  templateUrl: './recruit3.page.html',
  styleUrls: ['./recruit3.page.scss'],
})
export class Recruit3Page implements OnInit {
  message = '';
  messages:any = [];
  prospects: any = [];
  notSubmittedProspectsList: any = [];
  completedProspectsList: any = [];
  prospectsConstuctor: any = [];
  prospectsOnInit: any = [];
  loading;
  submissionDone = false;
  progress:any;
  submitTimer: any;
  constructor(
    public storageService: StorageService,
    public spService: SubmitProspectService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public router: Router
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
      this.notSubmittedProspectsList = p;
      //console.log(this.prospects);
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
            //this.router.navigate(['/recruiters/show-prospects']);
            this.clearPage();
            this.storageService.clearNewProspects();
          }
        }, {
          text: 'Save Report',
          role: 'cancel',
          handler: () => {
            //this.router.navigate(['/recruiters/show-prospects']);
            this.storageService.storeProspectReports(this.messages);
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  clearPage(){
    this.message = '';
    this.messages = [];
    this.prospects = [];
    this.notSubmittedProspectsList = [];
    this.loading = null;
    this.submissionDone = false;
    this.progress = null;
  }

  checkMessages(){
    console.log(this.messages);
  }

  sendProspectsLoop(i){
    // this.submitTimer = setTimeout(() => {

    // }, 10000);
    let currentProspect = {
      prospectNo: null,
      message: null,
      status: null,
      prospectData: null
    }
    this.message = 'Sending Prospect ' + String(i+1) + ' of ' + String(this.prospects.length) + '\r\n';

    this.submissionDone = true;
    console.log(this.prospects);
    this.spService.submit(this.prospects, i).then(result => {
      //console.log(result);
      this.progress = (i+1) / (this.prospects.length);
      //this.presentLoading('Sending Prospect ' + String(i+1) + ' of ' + String(this.prospects.length) );
      result.subscribe(p => {
        i++;
        if( p.Status == 2 ){
          this.completedProspectsList.push(this.notSubmittedProspectsList.splice(i,1));
        }
        currentProspect.message = p.Messages[0].Message;
        currentProspect.prospectNo = i;
        currentProspect.status = p.Status;
        currentProspect.prospectData = this.prospects[i];
        console.log(currentProspect);
        this.messages.push(currentProspect);
        // this.messages.push(
        //   {
        //     prospectNo: i,
        //     message: p.Messages[0].Message,
        //     status: p.Status,
        //     prospectData: this.prospects[i]
        //   }
        // );
        //this.progress = this.prospects.length / this.messages.length;

        // debugger;
        if( (i+1) === this.prospects.length){
          this.presentToast();
          this.message = "Submissions Report";
          console.log(this.messages);
          // this.submissionDone = true;
        } else if ( (i+1) < this.prospects.length ){
          this.sendProspectsLoop(i);
        }
        
        // this.loading.dismiss();
        // if(p.status === true){
        //    this.message += p.message + '\r\n';
        //   console.log(p);
        // } else {
        //   this.message += p.message + '\r\n';
        //   console.log(p);
        // }
      },
      err => {
        i++;
        this.sendProspectsLoop(i);
        console.log();
      });
    });
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
        
        this.messages.push(
          {
            prospectNo: i,
            prospectData: this.prospects[i],
            message: result.subscribe(p => p).toPromise().then(p => {
          
              console.log(this.messages, p);
              return p.Messages[0].Message;
            }),
            status: result.subscribe(p => p, err => err).toPromise().then(p => {
          
              console.log(this.messages, p);
              return p.Status;
            }),
          }
        );
        console.log(this.messages, result);
        // await result.subscribe(p => p).toPromise().then(p => {
          
        //   console.log(this.messages, p);
        //   return p.Messages[0].Message;
        // });
        //this.presentLoading('Sending Prospect ' + String(i+1) + ' of ' + String(this.prospects.length) );
        // await result.subscribe(async p => {
        //   if( p.Status == 2 ){
        //     this.notSubmittedProspectsList.splice(i,1);
        //   }
        //   await this.messages.push(
        //     {
        //       prospectNo: i,
        //       message: p.Messages[0].Message,
        //       status: p.Status,
        //       prospectData: this.prospects[i]
        //     }
        //   );
        //   console.log(this.messages);

        //   //debugger;
        //   if( (i+1) === this.prospects.length){
        //     this.presentToast();
        //     this.message = "Submissions Report";
        //     console.log(this.messages);
        //     // this.submissionDone = true;
        //   }
          
        //   // this.loading.dismiss();
        //   // if(p.status === true){
        //   //    this.message += p.message + '\r\n';
        //   //   console.log(p);
        //   // } else {
        //   //   this.message += p.message + '\r\n';
        //   //   console.log(p);
        //   // }
        // });
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




