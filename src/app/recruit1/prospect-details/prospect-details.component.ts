import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { StorageService } from 'src/app/providers/storage-service';

@Component({
  selector: 'app-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrls: ['./prospect-details.component.scss'],
})
export class ProspectDetailsComponent implements OnInit {
  //prospects:any = [];
  prospect;
  prospectID;
  constructor(
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

  ngOnInit() {}

}
