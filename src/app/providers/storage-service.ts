import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

/*
  Generated class for the StoreProspectsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageService {
	tokenVal: string;
  newProspectsArray: Array<any> = [];
  newProspect: any;
  prospectReportsArray: any;
  prospectReports: any;
  public prospectData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(public http: HttpClient, public storage: Storage) {
    //console.log('Hello StoreProspect Service Provider');
  }

  
  getUserName(){
  	return this.storage.get("username").then(val => val);
  }
  setUserToken(tokenValue){
  	this.storage.set("token", tokenValue);
  }
  getUserToken(){
  	return this.storage.get("token").then(val => val);
  }
  setUserName(userNameValue){
  	this.storage.set("username", userNameValue);
  }
  setCampaign(campaignValue){
  	this.storage.set("campaign", campaignValue);
  }
  getCampaign(){
  	return this.storage.get("campaign").then(val => val);
  }
  setUserPass(passValue){
  	this.storage.set("pass", passValue);
  }
  getUserPass(){
  	return this.storage.get("pass").then(val => val);
  }
  clearNewProspects(){
  	return this.storage.set("newProspects",[]).then(val => val);
  }
  storeProspectReports(nr){
    this.storage.ready().then(() => {
      this.storage.get("prospectReports").then((theReport) => {
        if(theReport == null){
          this.prospectReportsArray = [];
          this.prospectReportsArray.push(nr);
          this.storage.set("prospectReports", this.prospectReportsArray).then(() => {
            this.prospectReportsArray = [];
            // this.storage.get("prospectReports").then((pr) => {
            //   this.prospectData.next(pr);
            //   console.log(pr);
            // });
          });
        } else {
          this.prospectReportsArray = theReport;
          this.prospectReportsArray.push(nr)
          this.storage.set("prospectReports",this.prospectReportsArray).then(() => {
            this.prospectReportsArray = [];
            // this.storage.get("prospectReports").then((data) => {
            //   this.prospectData.next(data);
            //   console.log(data);
            // });
          });
         }
      });
    });

  }
  
  // getUserToken(){
  // 	this.storage.get("token").then((val) => {
  // 		console.log("val is", val);
  // 		this.tokenVal = val;
  // 	});
  // 	return this.tokenVal;
  // 	//console.log("Token is :" + this.token);
  // }

  removeStoredUser(){
  	this.storage.remove("token");
  	this.storage.remove("username");
  }

  test(){
    console.log("Form Page Loaded");
    this.storage.ready().then(() => {
      this.storage.set("newProspects", []);
      // this.storage.get("newProspects").then((val) => {
      //   if(val == null){
      //     this.storage.set("newProspects", []).then(() => {
      //       this.storage.get("newProspects").then((pr) => {
      //         //console.log(pr);
      //       });
      //     });
      //   }
      // });
      
    });
  }
  setProspectProgress(prospectProgress){
    this.storage.set("prospectProgress", prospectProgress).then(() => {
      // this.newProspectsArray = [];
      // this.storage.("newProspects").then((pr) => {
      //   console.log(pr);
      // });
    });
  }
  setNewProspect(np){
    //console.log("NP is: " + JSON.stringify(np));
    //this.newProspectsArray.push(np);
    this.storage.ready().then(() => {
      this.storage.get("newProspects").then((theProspect) => {
        if(theProspect == null){
          this.newProspectsArray = [];
          this.newProspectsArray.push(np);
          this.storage.set("newProspects", this.newProspectsArray).then(() => {
            this.newProspectsArray = [];
            this.storage.get("newProspects").then((pr) => {
              this.prospectData.next(pr);
              console.log(pr);
            });
          });
        } else {
          this.newProspectsArray = theProspect;
          this.newProspectsArray.push(np)
          this.storage.set("newProspects",this.newProspectsArray).then(() => {
            this.newProspectsArray = [];
            this.storage.get("newProspects").then((data) => {
              this.prospectData.next(data);
              console.log(data);
            });
          });
         }
      });
    });

    /*
    this.storage.ready().then(() => {
      this.storage.get("newProspects").then((val) => {
        if(val == null){
          this.storage.set("newProspects", []).then(() => {
            this.newProspectsArray.push(np);
            this.storage.set("newProspects", this.newProspectsArray).then(() => {
              this.newProspectsArray = [];
              this.storage.get("newProspects").then((pr) => {
                console.log(pr);
              });
            });
          });
        } else {
          this.storage.get("newProspects").then((oldProspects) => {
            this.newProspectsArray.push(oldProspects);
            this.newProspectsArray.push(np);
            this.storage.set("newProspects", this.newProspectsArray).then(() => {
              this.newProspectsArray = [];
              this.storage.get("newProspects").then((data) => {
                console.log(data);
              });
            });
          });
        }
      });
    });
    */
    
    // console.log(this.newProspectsArray);
    /* this.storage.get("newProspects")
    .then(
      (val) => { 
        if( val == null ){
          this.newProspectsArray.push( np );
          this.storage.set("newProspects", this.newProspectsArray );
          console.log(this.newProspectsArray);
          this.storage.get("newProspects").then((prospects: any[])=>{ console.log(prospects); });
        } else {
          this.newProspectsArray = [];
          this.newProspectsArray.push( val ); 
          this.newProspectsArray.push( np );
          this.storage.set("newProspects", this.newProspectsArray ); 
          console.log(this.newProspectsArray);
          this.storage.get("newProspects").then((prospects: any[])=>{ console.log(prospects); });
        }
      },
      (err) => { 
        this.newProspectsArray.push( np );
        this.storage.set("newProspects", this.newProspectsArray ); 
      }
    ).catch(() => {
      this.newProspectsArray.push( np );
      this.storage.set("newProspects", this.newProspectsArray );
      console.log(JSON.stringify(np));
    });*/
    //this.newProspectsArray.push(np);
    //this.storage.set("newProspects", JSON.stringify(this.newProspectsArray));
    
    //console.log(this.newProspectsArray)
  }
  getAllProspects(){
    return this.storage.get("newProspects").then(val => val);
  }
  getProspects(){
    this.storage.get("newProspects")
      .then(
        (val) => { console.log(val); },
        //(val) => { this.newProspectsArray = JSON.parse(val); },
        (err) => { /* this.storage.set("newProspects", "[]"); */ this.newProspectsArray = []; }
      );
    return this.newProspectsArray;
    //console.log("Token is :" + this.token);
  }


}
