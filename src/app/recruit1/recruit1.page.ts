import { Component, OnInit } from '@angular/core';
import { Data } from '../providers/data';
import { StorageService } from '../providers/storage-service';
import { ModalController } from '@ionic/angular';
import { ProspectDetailsComponent } from './prospect-details/prospect-details.component';

@Component({
  selector: 'app-recruit1',
  templateUrl: './recruit1.page.html',
  styleUrls: ['./recruit1.page.scss'],
})
export class Recruit1Page implements OnInit {

  prospects: any = [];
  constructor(
    public _data: Data,
    public storageService: StorageService,
    public modalController: ModalController
  ) {
    this.storageService.prospectData.subscribe((data) => {
      this.prospects = data;
      console.log(this.prospects);
    });
    /*
    storageService.getAllProspects().then(p => {
      this.prospects = p;
      console.log(this.prospects);
    });
    this.prospects = this.storageService.getProspects();
    console.log(this.prospects);
    */


    /*
    //old
		this._data.Prospects.subscribe((prospect) => { 
			this.prospects.push(prospect); 
			console.log(this.prospects); 
    });
    */
		//console.log(prospect);
		//this.prospects = data;
	}
  async presentProspectDetailsModal(pID) {

    let selectedProspect = this.prospects.filter(p => {
      return p.uniqueID == pID;
    })[0];
		
		const modal = await this.modalController.create({
      component: ProspectDetailsComponent,
      componentProps: {
        'prospectID': pID,
        'prospect': selectedProspect
      }
		});
		// modal.onDidDismiss().then((dataReturned) => {
			
		// });
		return await modal.present();
	}
  ionViewDidEnter(){
    this.storageService.getAllProspects().then(p => {
      this.prospects = p;
      console.log(this.prospects);
    });
  }
  ngOnInit() {
    this.storageService.getAllProspects().then(p => {
      this.prospects = p;
      console.log(this.prospects);
    });
  }

}
