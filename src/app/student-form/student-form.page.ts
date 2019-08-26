import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgControl } from '@angular/forms';
import { StorageService } from "../providers/storage-service";
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Data } from '../providers/data';

// import { Prospect } from './prospect-model';


// import { SegmentButton } from './segment-button';



@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.page.html',
  styleUrls: ['./student-form.page.scss'],
})


export class StudentFormPage implements OnInit {
  degreeType = "bga";
	prospectForm: FormGroup;

  @ViewChild(IonSlides) slides: IonSlides;

  // prospect: Prospect = new Prospect();
  
	changeDegreeType(type){
		this.degreeType = type;
	}
  submit(){
		// this._data.addProspect(this.prospect)
		// console.log("the current prospect is" + this.prospect)
		// this.prospect = new Prospect();
		//this.navCtrl.parent.select(0);
		//this.navCtrl.setRoot(Home);
	}
  constructor( 
    //public navCtrl: NavController, 
    public _data:Data, 
    private formBuilder: FormBuilder, 
    public storageService:StorageService ) {
		//this.buildProspectForm();
  }
  // slideToNext() {
	// 	//this.slider.getSlider().slideNext(); // also not working
	// 	this.slides.lockSwipes(false);
	//     this.slides.slideNext();
	//     this.slides.lockSwipes(true);
	// }
	// slideToPrev() {
	// 	//this.slider.getSlider().slideNext(); // also not working
	// 	this.slides.lockSwipes(false);
	// 	this.slides.slidePrev(); // not working
	// 	this.slides.lockSwipes(true);
	// }
	// buildProspectForm() {
	// 	this.prospectForm = this.formBuilder.group({
	// 		firstName: this.formBuilder.control(null),
	// 		lastName: this.formBuilder.control(null),
	// 		emailAddress: this.formBuilder.control(null),
	// 		address1: this.formBuilder.control(null),
	// 		address2: this.formBuilder.control(null),
	// 		city: this.formBuilder.control(null),
	// 		state: this.formBuilder.control(null),
	// 		zip: this.formBuilder.control(null),

	// 		program: this.formBuilder.group({
	// 			graphicBGA: this.formBuilder.control(null),
	// 			webBGA: this.formBuilder.control(null),
	// 			photoBGA: this.formBuilder.control(null),
	// 			videoBGA: this.formBuilder.control(null),
	// 			illustrationBGA: this.formBuilder.control(null),
	// 			graphicAS: this.formBuilder.control(null),
	// 			photoAS: this.formBuilder.control(null),
	// 			uxuiCT: this.formBuilder.control(null),
	// 			photoCT: this.formBuilder.control(null)
	// 		}),
	// 		textOK: this.formBuilder.control(null)
	// 	});
	// }
	// onResetForm() {

	// 	this.prospectForm.reset();
	// 	this.slides.lockSwipes(false);
	// 	this.slides.slideTo(0,500);
	// 	this.slides.lockSwipes(true);
	// }
	// onSubmitForm(){
	// 	//console.log(this.prospectForm.value);
	// 	this.storageService.setNewProspect(this.prospectForm.value);
	// 	//console.log(this.prospectForm.value);
	// }

	// ionViewDidLoad() { 
	// 	this.slides.lockSwipes(true); 
	// 	//this.storageService.test();
	// } 

  ngOnInit() {
  }

}
