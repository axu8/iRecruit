import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { StorageService } from 'src/app/providers/storage-service';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrls: ['./prospect-details.component.scss'],
})
export class ProspectDetailsComponent implements OnInit {
  //prospects:any = [];
  prospect;
  prospectID;
  navCtrl: NavController;
  constructor(
    public router: Router,
    public modalCtrl:ModalController,
    navCtrl: NavController,
    navParams: NavParams,
    public storageService: StorageService
  ){
      this.prospectID = navParams.get('prospectID');
      this.prospect = navParams.get('prospect');
      
      console.table(this.prospect);
      console.log(this.prospect, this.prospectID )
      // console.log(this.prospect, this.prospectID );
      // storageService.prospectData.subscribe((data) => {
      //   this.prospects = data;
      //   console.log(this.prospect, this.prospectID );
      //   this.prospect = this.prospects.filter(p => {
      //     console.log(this.prospectID, p.uniqueID );
      //     return p.uniqueID == this.prospectID;
      //   });
     
      // });
    // componentProps can also be accessed at construction time using NavParams
    // console.log(navParams.get('firstName')
  }
  close(){
    //this.router.navigate(['recruiters/show-prospects']);
    // this.navCtrl.back();
    this.modalCtrl.dismiss();
  }
  ngOnInit() {}

}
