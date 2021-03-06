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
import { IonContent } from '@ionic/angular';
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
  @ViewChild(IonContent) content: IonContent;

  

	public slideOneForm: FormGroup;
	public slideTwoForm: FormGroup;
	public slideThreeForm: FormGroup;
	public slideFourForm: FormGroup;
	public studentPhoneForm: FormGroup;
	public paretnPhoneForm: FormGroup;
	// public slideFiveForm: FormGroup;
	public submitAttempt: boolean = false;
	degreeType = "bga";
	prospectForm: FormGroup;
	segment;
	slideBeginning;
	slideEnd;
	recruiterNotes;
	

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
		public storageService:StorageService 
	){
    //this.buildProspectForm();
    this.slideOneForm = formBuilder.group({
        firstName: this.formBuilder.control(null, Validators.required),
        lastName: this.formBuilder.control(null, Validators.required),
        emailAddress: this.formBuilder.control(null, Validators.compose([
			Validators.required,
			Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
		])),
		studentPhone: this.formBuilder.control(null, Validators.compose([
			Validators.required,
			Validators.minLength(13),
			Validators.maxLength(13)
		])),
		okToText: this.formBuilder.control(true, Validators.required),
        //okToText:[''] yourControl: [0, Vaidators.required]
	});
	// this.studentPhoneForm = formBuilder.group({
	// 	areaCode: this.formBuilder.control(null, Validators.compose([
	// 		Validators.required,
	// 		Validators.minLength(3),
	// 		Validators.maxLength(3),
	// 		Validators.pattern('^[0-9]*$')
	// 	])),
	// 	firstThree: this.formBuilder.control(null, Validators.compose([
	// 		Validators.required,
	// 		Validators.minLength(3),
	// 		Validators.maxLength(3),
	// 		Validators.pattern('^[0-9]*$')
	// 	])),
	// 	lastFour: this.formBuilder.control(null, Validators.compose([
	// 		Validators.required,
	// 		Validators.minLength(4),
	// 		Validators.maxLength(4),
	// 		Validators.pattern('^[0-9]*$')
	// 	])),
		
    // });
    this.slideTwoForm = formBuilder.group({
      address1: this.formBuilder.control(null, Validators.required),
      address2: this.formBuilder.control(null),
      city: this.formBuilder.control(null, Validators.required),
      state: this.formBuilder.control(null, Validators.required),
      zip: this.formBuilder.control(null,  Validators.compose([
			Validators.required,
			Validators.minLength(5)
		]))
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
	}/* , {validator: this.checkDegreeSelection()} */);
	
	this.slideFourForm = formBuilder.group({
		highSchool: this.formBuilder.control(null, Validators.required),
		gradYear: this.formBuilder.control(null, Validators.compose([
			Validators.required,
			Validators.minLength(2)
		])),
		parentName: this.formBuilder.control(null, Validators.required),
		parentPhone: this.formBuilder.control(null, Validators.compose([
			Validators.required,
			Validators.minLength(10)
		])), //home phone
		instagram: this.formBuilder.control(null), //custom notes
	});
  }
//   checkDegreeSelection(){
// 	  if( this.slideThreeForm.get('graphicBGA').value || this.slideThreeForm.get('webBGA').value || this.slideThreeForm.get('photoBGA').value || this.slideThreeForm.get('illustrationBGA').value || this.slideThreeForm.get('videoBGA').value){
// 		return true;
// 	  } else {
// 		return false;
// 	  }
//   }
onInputEntry(event, nextInput) {
    let input = event.target;
    let length = input.value.length;
    let maxLength = input.attributes.maxlength.value;

    if (length >= maxLength) {
      nextInput.focus();
    }
}
formatNumber(event, numberField, numberFieldValue) {

    let input = numberField;
    let length = numberField.value.length;

	if(length == 3 ){
		if( input.value.charAt(0)!="(" && input.value.charAt(0)!=")" ){
			input.value = "(" + input.value + ")";
		}
		
	} else if(length == 9 && !input.value.match('-') && input.value.charAt(9)!="-" ){
		let ninthChar = input.value.charAt(8);
		input.value = input.value.slice(0,-1) + "-" + ninthChar;
	}

	input.value = input.value.replace(/\s/g,'');
    // if (length >= maxLength) {
    //   nextInput.focus();
    // }
}
  slideToNext() {
		//this.slider.getSlider().slideNext(); // also not working
		this.slides.lockSwipes(false);
		this.slides.slideNext();
		this.content.scrollToTop(0);
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
		this.content.scrollToTop(0);
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
	async presentCustomAlert(h, s, m, c) {
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
		modal.onDidDismiss().then((dataReturned) => {
			//this.presentAlertRadio();
			//console.log('Back');
			
			if (dataReturned.data == true) {
				
				this.presentAlertRadio();
				//console.log(dataReturned.data);
				//this.dataReturned = dataReturned.data;
				//alert('Modal Sent Data :'+ dataReturned);
			}
			
		});
		return await modal.present();
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
				this.storageService.getUserName().then( recruiterName => {

					let userObject = { "recuiterName": recruiterName };
					let recruiterObject = { "recuiterNotes": data };
					let degreeObject = {"degree": this.slideThreeForm.value};
					let uniqueID = {"uniqueID": this.createID()};
					let createdDateTime = {"createdDateTime": '\/Date(' + new Date().getTime() + ')\/'};
					let finalForm = Object.assign(recruiterObject, this.slideOneForm.value, this.slideTwoForm.value, degreeObject, userObject, uniqueID, createdDateTime, this.slideFourForm.value);
					console.log(finalForm);
					this.recruiterNotes = data;
					this.storageService.setNewProspect(finalForm);
					this.presentCustomAlert(
						'Prospect Stored',
						'',
						'Return to Student Apply Form',
						() => {
							console.log(this.recruiterNotes);
							this.slideOneForm.reset();
							this.slideTwoForm.reset();
							this.slideThreeForm.reset();
							this.slideFourForm.reset();
							this.slideOneForm = this.formBuilder.group({
								firstName: this.formBuilder.control(null, Validators.required),
								lastName: this.formBuilder.control(null, Validators.required),
								emailAddress: this.formBuilder.control(null, Validators.compose([
									Validators.required,
									Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
								])),
								studentPhone: this.formBuilder.control(null, Validators.compose([
									Validators.required,
									Validators.minLength(10)
								])),
								okToText: this.formBuilder.control(true, Validators.required),
								//okToText:[''] yourControl: [0, Vaidators.required]
							});

							//this.slider.getSlider().slideNext(); // also not working
							this.slides.lockSwipes(false);
							this.slides.slideTo(0);
							this.content.scrollToTop(0);
							this.slides.lockSwipes(true);
							//console.log( this.slides.nativeElement.isBeginning() );
							this.slides.isBeginning().then(data => {
								this.slideBeginning = data;
							});
							this.slides.isEnd().then(data => {
								this.slideEnd = data;
							});
							console.log(this.slideEnd, this.slideBeginning);
							//this.modalCtrl.dismiss(data);
							/*this.storageService.setRecruiterNotes(data).then( result => {
							
							});*/
							//this.router.navigate(['students/student-form']);
						}
					);
				});
			  }
			}
		  ]
		});
	
		await alert.present();
	}
	createID(){
		var date = new Date();
		var components = [
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			// date.getSeconds(),
			//date.getMilliseconds()
		];

		var id = components.join("");
		id = id.substr(2);
		
		console.log(id);

		function randomNo(n){
			var num = "";
			for(var i=0; i < n; i++){
			num += String(Math.floor(Math.random()*10))

			}
			return num;
		}
		id = id + randomNo(10-id.length);
		console.log("ID is " + id);
		return id;
 		/*
		var id = 'xxxxxxxx'.replace(/[x]/g, function(c) {
			//var r = (dt + Math.random()*16)%16 | 0;
			//dt = Math.floor(dt/16);
			  //return new Date().getTime().toString().split('').splice(0,13).join('') + String(Math.floor(Math.random()*10))
			return String(Math.floor(Math.random()*10))
			//return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
	 
		return new Date().getTime().toString() + id;
		//return new Date().getTime().toString().slice(5);
		*/
		
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

