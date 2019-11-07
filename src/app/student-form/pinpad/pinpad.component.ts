import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/providers/storage-service';
// import { Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-pinpad',
  templateUrl: './pinpad.component.html',
  styleUrls: ['./pinpad.component.scss'],
})
export class PinpadComponent implements OnInit {

  @Input() pagetitle: String = "Recruiter Pin";

  pin:string= "";
  modalCtrl:ModalController;

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    modalCtrl: ModalController,
    public alertController: AlertController,
    public router: Router,
    public storageService: StorageService
  ) {
    this.modalCtrl = modalCtrl;
  }

  close(){
    this.modalCtrl.dismiss();
  }

  emitEvent() {
    this.change.emit(this.pin);
  }

  handleInput(pin: string) {
    if (pin === "clear") {
      this.pin = "";
      return;
    }

    if (this.pin.length === 4) {
      return;
    }
    this.pin += pin;
  }

  submitPin(){
    if (this.pin.length === 4) {
      this.storageService.getUserPass().then( result => {
        console.log(result);
        console.log(this.pin);
        if(result.match(this.pin)){
          this.modalCtrl.dismiss(true);
          //this.presentAlertRadio();
        } else {
          this.pin = "";
          this.presentAlert(
            'Invalid Pin',
            'Please try again.',
            'If you are not a recruiter, please ask one for assistance.',
            () => {
              return;
            }
          );
        }
      });
    }
  }
  async presentAlert(h, s, m, c) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: h,
      subHeader: s,
      message: m,
      buttons: [
        {
          text: 'OK',
          handler: c
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Recruiter Notes',
      inputs: [
        // {
        //   name: 'recruiterPreset',
        //   type: 'radio',
        //   label: 'None',
        //   value: '"No Recruiter Comment"',
        //   checked: true
        // },
        {
          name: 'recruiterPreset',
          type: 'radio',
          label: 'WHAN',
          value: 'WHAN'
        },
        {
          name: 'recruiterPreset',
          type: 'radio',
          label: 'AG',
          value: 'AG'
        },
        {
          name: 'recruiterPreset',
          type: 'radio',
          label: 'AP',
          value: 'AP'
        },
        {
          name: 'recruiterPreset',
          type: 'radio',
          label: 'HSG',
          value: 'HSG'
        },
        {
          name: 'recruiterPreset',
          type: 'radio',
          label: 'TSP',
          value: 'TSP'
        }
      ],
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   cssClass: 'secondary',
        //   handler: () => {
        //     console.log('Confirm Cancel');
        //   }
        // }, 
        {
          text: 'Ok',
          handler: (data) => {
            this.presentAlert(
              'Prospect Stored',
              '',
              'Return to Student Apply Form',
              () => {
                this.modalCtrl.dismiss(data);
                /*this.storageService.setRecruiterNotes(data).then( result => {
                
                });*/
                //this.router.navigate(['students/student-form']);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  
  ngOnInit() {}

}
