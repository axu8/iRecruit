import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { SisService } from '../providers/sis.service';
import { StorageService } from '../providers/storage-service'

@Component({
  selector: 'app-schedule-manager',
  templateUrl: './schedule-manager.page.html',
  styleUrls: ['./schedule-manager.page.scss'],
})
export class ScheduleManagerPage implements OnInit {

  studentData;

  constructor(
    public actionSheetController: ActionSheetController,
    public sis: SisService,
    public storage:StorageService
  ) { }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Bulk Add Student Options',
      buttons: [
      // {
      //   text: 'Delete',
      //   role: 'destructive',
      //   icon: 'trash',
      //   handler: () => {
      //     console.log('Delete clicked');
      //   }
      // }, 
      {
        text: 'Add Active Students',
        icon: 'share',
        handler: () => {
          this.getActiveStudents("01.Active",1,100);
        }
      }, {
        text: 'Add Transfer Students',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Add New Students',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
      //   text: 'Import Course Data',
      //   icon: 'list',
      //   handler: () => {
      //     console.log('Import clicked');
      //   }
      // }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  getActiveStudents(s,pc,ps){
    this.sis.getActiveStudents(s,pc,ps).subscribe( res => {
			console.log('Response', res);
		});
  }

  ngOnInit() {
  }

}
