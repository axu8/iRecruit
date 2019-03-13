import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
// import { IonicPage, NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the RecruiterAuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RecruiterAuthService {

	constructor(private http: Http) {
	}

	res:any;

	headers = new Headers({'Content-Type': 'application/json','Accept':'application/json'});

	creds:any;

	body:any;

	reqStatus:any;

	getAuth(un,up) {
		this.creds = {
			"ClientId":"1DB3C50D-C215-4463-A2A8-7141B5200561",
			"PartnerCode":"VMDSDR",
			"PartnerKey":"vmdsdrrmrejykpgzeuoe",
			"Password":up,
			"Username":un
		}
		this.body = JSON.stringify(this.creds);
		//console.log(this.body);
		this.http.post("http://topx.topschoolstage.com/Security/partnerlogin", this.body, {headers: this.headers})
        .map(response => {
			this.res = response.json();
		})
		.subscribe(
			data => {
				if(this.res.IsValid == true){
					alert("Login Successful");
				} else {
					this.reqStatus = this.res.IsValid;
					alert(this.res.Messages[0].Message);
				}
				console.log(this.res);
			},
			err => console.log("Sorry: " + err),
			() => console.log("Authentication Complete. . .")
		);
		return this.reqStatus;
	}
	
	//console.log('Hello RecruiterAuthService Provider');
	// constructor(http: Http, nav: NavController) {
 //        this.http = http;
 //        this.nav = navCtrl;
 //    }
 
    // makeGetRequest() {
    //     this.http.get("https://httpbin.org/ip")
    //     .subscribe(data => {
    //         var alert = Alert.create({
    //             title: "Your IP Address",
    //             subTitle: data.json().origin,
    //             buttons: ["close"]
    //         });
    //         this.nav.present(alert);
    //     }, error => {
    //         console.log(JSON.stringify(error.json()));
    //     });
    // }
 	test() {
 		alert("ras test");
 	}
    makePostRequest() {
        this.http.post("https://httpbin.org/post", "firstname=Nic")
        .subscribe(data => {
            /*var Alert = alert.create({
                title: "Data String",
                subTitle: data.json().data,
                buttons: ["close"]
            });
            this.navCtrl.present(alert);*/
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
    }
	ionViewDidLoad() {
	//console.log('ionViewDidLoad RecruitAuth');
	}

}
