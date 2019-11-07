import { Injectable } from '@angular/core';
// import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';
import { map, timeout, catchError, finalize } from "rxjs/operators";
import { StorageService } from './storage-service';
import { throwError, TimeoutError } from 'rxjs';

/*
  Generated class for the SubmitProspectService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SubmitProspectService {
	creds: any;
    body: any;
    res = {
        message: ''
	};
	campaign;
	token: any;
	notes:any = {
		degree: null,
		instagram: null,
		parentName: null,
		parentPhone: null 
	};
	ngOnInit() {
		// this.storage.getUserToken().then(t => {
		//   this.token = t;
		// });
		this.storage.getCampaign().then(c => {
			this.campaign = c;
		});
		
		this.storage.prospectData.subscribe((data) => {
			this.prospects = data;
			console.log(this.prospects);
		});
	
	}
	ionViewDidEnter(){
		this.storage.getAllProspects().then(p => {
			this.prospects = p;
			console.log(this.prospects);
		});
		this.storage.getUserToken().then(t => {
			this.token = t;
		});
	}
	prospects: any = [];
	headers;
	// headers = new HttpHeaders({
	// 	'Content-Type': 'application/json',
	// 	'Accept':'application/json',
	// });

	// headers = new HttpHeaders()
	// .set( 'TopSchoolSecurityToken', this.token )
	// .set( 'Accept','application/json' )
	// .set( 'Content-Type', 'application/json' );
	
	constructor(
		public http: HttpClient, 
		public storage: StorageService
	) {
		// this.storage.getUserToken().then(t => {
		// 	this.token = t;
		// });
		this.storage.prospectData.subscribe((data) => {
			this.prospects = data;
			console.log(data);
		});
		// this.storage.getAllProspects().then(p => {
		// 	this.prospects = p;
		// 	console.log(this.prospects);
		// });
		// this._data.Prospects.subscribe((prospects) => { 
		// 	//this.prospects = prospects; 
		// 	this.prospects.push(prospects); 
		// 	//console.log(this.prospects);
		// });
		console.log(JSON.stringify(this.prospects));
		//this.prospects = data;
		console.log(this.storage.getUserToken());
	}
	async submit(pr,n): Promise<any> {
		await this.storage.getUserToken().then(t => {
			this.token = t;
			//this.headers.append('TopSchoolSecurityToken', this.token);
			this.headers = new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept':'application/json',
				'TopSchoolSecurityToken': this.token
			});
		});

		
		console.log(this.headers, this.token);
		// this.notes.degree = pr[n]['degree'];
		// this.notes.instagram = pr[n]['instagram'];
		// this.notes.parentName = pr[n]['parentName'];
		// this.notes.parentPhone = pr[n]['parentPhone'];

		this.creds = {
		    "Opportunity":{
				"Campaign": this.campaign,
				"IsDefault":true,
				"OpportunityId":pr[n].uniqueID,
				"ProspectId":pr[n].uniqueID
				// "LeadProvider": JSON.stringify(pr[n]),
			},
			"CustomFieldValues":[
				// {
				// 	"FieldName":"Notes",
				// 	"Value": JSON.stringify(this.notes)
				// },
				{
					"FieldName":"HSGradDate",
					"Value": String(pr[n].gradYear)
				},
				{
					"FieldName":"HSGraduationDate",
					"Value": String(pr[n].gradYear)
				},
				{
					"FieldName":"High School Name",
					"Value": pr[n].highSchool
				},
				{
					"FieldName":"Okay to Text",
					"Value": pr[n].okToText ? "Yes":"No"
				},
				// {
				// 	"FieldName":"instagram",
				// 	"Value": pr[n].instagram
				// },
				// {
				// 	"FieldName":"instagram",
				// 	"Value": pr[n].instagram
				// },
				// {
				// 	"FieldName":"parentName",
				// 	"Value": pr[n].parentName
				// },
				// {
				// 	"FieldName":"parentPhone",
				// 	"Value": pr[n].parentPhone
				// },
				// {
				// 	"FieldName":"recruiterName",
				// 	"Value": pr[n].recruiterName
				// },
				// {
				// 	"FieldName":"recruiterNotes",
				// 	"Value": pr[n].recruiterNotes
				// },
				// {
				// 	"FieldName":"degree",
				// 	"Value":pr[n].degree
				// }
			],
			"Prospect":{
				"Address": pr[n].address1,
				"Address2": pr[n].address2,
				"City":pr[n].city,
				//"Country":"",
				//"CountryOfCitizenship":"",
				//"County":"",
				"CreatedDateTime": pr[n].createdDateTime,
				// "DoNotCallIndicator":true,
				// "DoNotEmailIndicator":true,
				"EmailAddress":pr[n].emailAddress,
				"FirstName":pr[n].firstName,
				// "Gender":"female",
				//"HispanicOfAnyRace":"",
				"HomePhoneNumber":pr[n].parentPhone,
				"Id": pr[n].uniqueID,
				"LastName":pr[n].lastName,
				"MobilePhoneNumber":pr[n].studentPhone,
				"PostalCode":pr[n].zip,
				//"Prefix":"",
				"State":pr[n].state,
				"UniqueId":pr[n].uniqueID,
				//"WorkPhoneNumber":""
			}
		}
		this.body = JSON.stringify(this.creds);
		console.log(this.body);
        // return this.http.post('http://topx.topschoollive.com/Recruitment/prospects', this.body, {headers: this.headers})
        // .map((response: Response) => {
		// 	console.log(response);
        //     //this.res.message = response.json().Messages[0].Message;
              
        //     return response;
            
		// });
		return this.http.post('http://topx.topschoollive.com/Recruitment/prospects', this.body, {headers: this.headers})
        .pipe(
            timeout(10000),
            map((response: any) => { // Success...
              return response;
            }),
            catchError((error) => { // Error...
              // Timeout over also handled here
			  // I want to return an error for timeout
			  if(error instanceof TimeoutError){
				return throwError('Timeout Exception');
			  }
              return throwError(error || 'Timeout Exception');
            }),
            finalize(() => {
              console.log('Request it is over');
            })
        );
	}
	send(): Observable<any> {
		console.log(this.prospects);
		
			let newId = String(Math.round(Math.random() * 10000));
			let opportunityId = String(Math.round(Math.random() * 10000));
			let uniqueId = String(Math.round(Math.random() * 10000));
			let randomId = String(Math.round(Math.random() * 10000000));
			let randomAddressNumber = String(Math.round(Math.random() * 100));
			let randomAddressNumber2 = String(Math.round(Math.random() * 100));
			let randomPhone1 = String(Math.round(Math.random() * 899) + 100);
			let randomPhone2 = String(Math.round(Math.random() * 899) + 100);
			let randomPhone3 = String(Math.round(Math.random() * 899) + 100);

	        this.creds = {
		    "Opportunity":{
				"Campaign": this.campaign
				// "IsDefault":true,
				// "OpportunityId":newId,
				// "ProspectId":opportunityId
			},
			"CustomFieldValues":[
				{
					"FieldName":"gradYear",
					"Value": this.prospects[0].gradYear
				},
				{
					"FieldName":"highSchool",
					"Value": this.prospects[0].highSchool
				},
				{
					"FieldName":"instagram",
					"Value": this.prospects[0].instagram
				},
				{
					"FieldName":"okToText",
					"Value": this.prospects[0].okToText
				},
				{
					"FieldName":"instagram",
					"Value": this.prospects[0].instagram
				},
				{
					"FieldName":"parentName",
					"Value": this.prospects[0].parentName
				},
				{
					"FieldName":"parentPhone",
					"Value": this.prospects[0].parentPhone
				},
				{
					"FieldName":"recruiterName",
					"Value": this.prospects[0].recruiterName
				},
				{
					"FieldName":"recruiterNotes",
					"Value": this.prospects[0].recruiterNotes
				},
				{
					"FieldName":"degree",
					"Value":this.prospects[0].degree
				}
			],
			"Prospect":{
				"Address": this.prospects[0].address1,
				"Address2": this.prospects[0].address2,
				"City":this.prospects[0].city,
				// "Country":"USA",
				// "CountryOfCitizenship":"USA",
				// "County":"Davidson",
				// "DoNotCallIndicator":true,
				// "DoNotEmailIndicator":true,
				"EmailAddress":this.prospects[0].emailAddress,
				"FirstName":this.prospects[0].firstName,
				"Gender":"female",
				// "HispanicOfAnyRace":true,
				"HomePhoneNumber":this.prospects[0].firstName,
				"Id": randomId,
				"LastName":this.prospects[0].lastName,
				// "MobilePhoneNumber":"1615654" + randomPhone2,
				"PostalCode":this.prospects[0].zip,
				// "Prefix":"ms.",
				"State":this.prospects[0].state,
				"UniqueId":this.prospects[0].uniqueID,
				// "WorkPhoneNumber":"1615654" + randomPhone1
			}
		}
        //this.body = JSON.stringify(this.creds);
        this.body = this.creds;
        return this.http.post('http://topx.topschoollive.com/Recruitment/prospects', this.body, {headers: this.headers})
        .map((response: Response) => {
			console.log(response);
            //this.res.message = response.json().Messages[0].Message;
              
            return response;
            
		});
		
    }
}

/*

{
	"Opportunity":{
		"IsDefault":true,
		"OpportunityId":4224,
		"ProspectId":452245
	},
	"Prospect":{
		"Address":"12345 Fake St.",
		"Address2":"45645 Fake St.",
		"City":"Nashville",
		"Country":"USA",
		"CountryOfCitizenship":"USA",
		"County":"Davidson",
		"DoNotCallIndicator":true,
		"DoNotEmailIndicator":true,
		"EmailAddress":"student15@mail.com",
		"FirstName":"Salliew5",
		"Gender":"female",
		"HispanicOfAnyRace":true,
		"HomePhoneNumber":"1615656545",
		"Id":2147228069,
		"LastName":"Testington",
		"MobilePhoneNumber":"1615654645",
		"PostalCode":"37216",
		"Prefix":"ms.",
		"State":"tn",
		"UniqueId":"3442256",
		"WorkPhoneNumber":"1615654945"
	}
}

*/

