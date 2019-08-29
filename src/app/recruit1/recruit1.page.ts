import { Component, OnInit } from '@angular/core';
import { Data } from '../providers/data';
import { StorageService } from '../providers/storage-service';

@Component({
  selector: 'app-recruit1',
  templateUrl: './recruit1.page.html',
  styleUrls: ['./recruit1.page.scss'],
})
export class Recruit1Page implements OnInit {

  prospects: any = [];
  constructor(
    public _data: Data,
    public storageService: StorageService
  ) {
    storageService.getAllProspects().then(p => {
      this.prospects = p;
      console.log(this.prospects);
    });
    this.prospects = this.storageService.getProspects();
    console.log(this.prospects);
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
