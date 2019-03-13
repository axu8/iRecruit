import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { ReplaySubject } from 'rxjs'
import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {
	prospects: ReplaySubject<{}> = new ReplaySubject<{}>()
	constructor(/*public http: Http*/) {
		console.log('Hello Data Provider');
	}
	get Prospects(){
		return this.prospects;
	}
	addProspect(prospect){
		this.prospects.next(prospect)
		//console.log(prospect);
	}

}
