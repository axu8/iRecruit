import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgControl } from '@angular/forms';
import { StorageService } from "../../providers/storage-service";
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Data } from '../../providers/data';
import { Prospect } from '../prospect-model';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PinpadComponent } from '../pinpad/pinpad.component';
// import { KeypadComponent } from '../../keypad/keypad.component';
//import { PinpadPage } from '../../pinpad/pinpad.page';
// import { PinpadPageModule } from '../../pinpad/pinpad.module';



@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})



export class MainFormComponent implements OnInit {
  // myForm;
  // this.myForm = formBuilder.group({
  //   firstName: ['value'],
  //   lastName: ['value', *validation function goes here*],
  //   age: ['value', *validation function goes here*, *asynchronous validation function goes here*]
  // });
  
  @ViewChild('signupSlider') signupSlider;

  

	public slideOneForm: FormGroup;
	public slideTwoForm: FormGroup;
	public slideThreeForm: FormGroup;
	public slideFourForm: FormGroup;
	// public slideFiveForm: FormGroup;
	public submitAttempt: boolean = false;
	degreeType = "bga";
	prospectForm: FormGroup;
	segment;
	slideBeginning;
	slideEnd;

  // @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('slides') slides;

  next(){
    this.signupSlider.slideNext();
  }

  prev(){
      this.signupSlider.slidePrev();
  }


  prospect: Prospect = new Prospect();
  
	changeDegreeType(type){
		this.degreeType = type;
	}
  submit(){
		this._data.addProspect(this.prospect)
		console.log("the current prospect is" + this.prospect)
		this.prospect = new Prospect();
		//this.navCtrl.parent.select(0);
		//this.navCtrl.setRoot(Home);
	}
  constructor( 
	//public navCtrl: NavController, 
	public modalController: ModalController,
	public alertController: AlertController,
    public _data:Data, 
    public formBuilder: FormBuilder, 
    public storageService:StorageService ) {
    this.buildProspectForm();
    this.slideOneForm = formBuilder.group({
        firstName: [''],
        lastName: [''],
        emailAddress: [''],
        studentPhone:[''],
        okToText:['']
    });
    this.slideTwoForm = formBuilder.group({
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      zip: ['']
    });
    this.slideThreeForm = formBuilder.group({
      graphicBGA: this.formBuilder.control(null),
      webBGA: this.formBuilder.control(null),
      photoBGA: this.formBuilder.control(null),
      videoBGA: this.formBuilder.control(null),
      illustrationBGA: this.formBuilder.control(null),
      // graphicAS: this.formBuilder.control(null),
      // photoAS: this.formBuilder.control(null),
      // uxuiCT: this.formBuilder.control(null),
      // photoCT: this.formBuilder.control(null)
	});
	this.slideFourForm = formBuilder.group({
		highSchool: [''],
		gradYear: [''],
		parentName: [''],
		parentPhone: [''], //home phone
		instagram: [''], //custom notes
		recruiterNotes: [''] //custom notes
	});
	// this.slideFiveForm = formBuilder.group({
	// 	address1: [''],
	// 	address2: [''],
	// 	city: [''],
	// 	state: [''],
	// 	zip: ['']
	// });
  }
  slideToNext() {
		//this.slider.getSlider().slideNext(); // also not working
		this.slides.lockSwipes(false);
	    this.slides.slideNext();
		this.slides.lockSwipes(true);
		//console.log( this.slides.nativeElement.isBeginning() );
		this.slides.isBeginning().then(data => {
			this.slideBeginning = data;
		});
		this.slides.isEnd().then(data => {
			this.slideEnd = data;
		});
		console.log(this.slideEnd, this.slideBeginning);
	}
	slideToPrev() {
		//this.slider.getSlider().slideNext(); // also not working
		this.slides.lockSwipes(false);
		this.slides.slidePrev(); // not working
		this.slides.lockSwipes(true);
		this.slides.isBeginning().then(data => {
			this.slideBeginning = data;
		});
		this.slides.isEnd().then(data => {
			this.slideEnd = data;
		});
	}
	buildProspectForm() {
		this.prospectForm = this.formBuilder.group({
			firstName: this.formBuilder.control(null),
			lastName: this.formBuilder.control(null),
			emailAddress: this.formBuilder.control(null),
			address1: this.formBuilder.control(null),
			address2: this.formBuilder.control(null),
			city: this.formBuilder.control(null),
			state: this.formBuilder.control(null),
			zip: this.formBuilder.control(null),

			program: this.formBuilder.group({
				graphicBGA: this.formBuilder.control(null),
				webBGA: this.formBuilder.control(null),
				photoBGA: this.formBuilder.control(null),
				videoBGA: this.formBuilder.control(null),
				illustrationBGA: this.formBuilder.control(null),
				graphicAS: this.formBuilder.control(null),
				photoAS: this.formBuilder.control(null),
				uxuiCT: this.formBuilder.control(null),
				photoCT: this.formBuilder.control(null)
			}),
			textOK: this.formBuilder.control(null)
		});
	}
	onResetForm() {

		// this.prospectForm.reset();
		this.slideOneForm.reset();
		this.slideTwoForm.reset();
		this.slideThreeForm.reset();
		this.slideFourForm.reset();
		this.slides.lockSwipes(false);
		this.slides.slideTo(0,500);
		this.slides.lockSwipes(true);
	}
	onSubmitForm(){
		//console.log(this.prospectForm.value);
		this.storageService.setNewProspect(this.prospectForm.value);
		//console.log(this.prospectForm.value);
	}

	ionViewDidLoad() { 
		this.slides.lockSwipes(true); 
		//this.storageService.test();
	} 

	async presentAlert() {
		const alert = await this.alertController.create({
		  header: 'Thanks for Requesting Info!',
		//   subHeader: 'We\'ll be in touch shortly.',
		  message: 'Please hand the tablet back to your recruiter for verification.',
		  buttons: [
			  {
				text: 'OK',
				handler: () => {
					this.presentModal();
				}
			  }
		  ]
		});
	
		await alert.present();
	}
	async presentModal() {
		console.log("MODAL!!");
		const modal = await this.modalController.create({
			component: PinpadComponent
		});
		return await modal.present();
	}
	ngOnInit() {
		this.slides.isBeginning().then(data => {
			this.slideBeginning = data;
		});
		this.slides.isEnd().then(data => {
			this.slideEnd = data;
		});
	}

}

