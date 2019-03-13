import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Data } from './data';
import { map } from "rxjs/operators";

/*
  Generated class for the SubmitProspectService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SubmitProspectService {
	prospects: any = [];
	headers = new Headers({
		'Content-Type': 'application/json',
		'Accept':'application/json',
		'TopSchoolSecurityToken': JSON.parse(localStorage.getItem('currentUser')).token
	});
	creds: any;
    body: any;
    res = {
        message: ''
    };
	constructor(public http: Http, public _data: Data) {
		this._data.Prospects.subscribe((prospects) => { 
			//this.prospects = prospects; 
			this.prospects.push(prospects); 
			//console.log(this.prospects);
		});
		console.log(JSON.stringify(this.prospects));
		//this.prospects = data;
	}
	send(): Observable<any> {
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
				"IsDefault":true,
				"OpportunityId":newId,
				"ProspectId":opportunityId
			},
			"Prospect":{
				"Address": randomAddressNumber + " Fake St.",
				"Address2": randomAddressNumber + " Fake St.",
				"City":"Nashville",
				"Country":"USA",
				"CountryOfCitizenship":"USA",
				"County":"Davidson",
				"DoNotCallIndicator":true,
				"DoNotEmailIndicator":true,
				"EmailAddress":this.prospects[0].emailAddress,
				"FirstName":this.prospects[0].firstName,
				"Gender":"female",
				"HispanicOfAnyRace":true,
				"HomePhoneNumber":"1615654" + randomPhone3,
				"Id": randomId,
				"LastName":this.prospects[0].lastName,
				"MobilePhoneNumber":"1615654" + randomPhone2,
				"PostalCode":"37216",
				"Prefix":"ms.",
				"State":"tn",
				"UniqueId":uniqueId,
				"WorkPhoneNumber":"1615654" + randomPhone1
			}
		}
        //this.body = JSON.stringify(this.creds);
        this.body = this.creds;
        return this.http.post('http://topx.topschoolstage.com/Recruitment/prospects', this.body, {headers: this.headers})
        .map((response: Response) => {

            this.res.message = response.json().Messages[0].Message;
              
            return this.res;
            
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

