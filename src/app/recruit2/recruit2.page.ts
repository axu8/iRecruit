import { Component, OnInit } from '@angular/core';
import { StorageService } from '../providers/storage-service';

@Component({
  selector: 'app-recruit2',
  templateUrl: './recruit2.page.html',
  styleUrls: ['./recruit2.page.scss'],
})
export class Recruit2Page implements OnInit {
  campaign;
  user;
  prospects: any = [];
  date;
  constructor(
    public storageService: StorageService
  ) { 
    this.storageService.prospectData.subscribe((data) => {
      this.prospects = data;
    });
  }

  ionViewDidEnter(){
    this.storageService.getAllProspects().then(p => {
      this.prospects = p;
      console.log(this.prospects);
    });
  }
  ngOnInit() {
    this.date = new Date().toUTCString();
    this.storageService.getCampaign().then((d)=>{
      this.campaign = d;
    });
    this.storageService.getUserName().then((d)=>{
      this.user = d;
    });
    this.storageService.prospectData.subscribe((data) => {
      this.prospects = data;
    });
  }

}
