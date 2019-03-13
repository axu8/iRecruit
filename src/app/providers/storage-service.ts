import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

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

  constructor(public http: HttpClient, public storage: Storage) {
    //console.log('Hello StoreProspect Service Provider');
  }

  setUserToken(tokenValue){
  	this.storage.set("token", tokenValue);
  }
  setUserName(userNameValue){
  	this.storage.set("username", userNameValue);
  }


  getUserToken(){
  	this.storage.get("token").then((val) => {
  		console.log("val is", val);
  		this.tokenVal = val;
  	});
  	return this.tokenVal;
  	//console.log("Token is :" + this.token);
  }

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
              console.log(pr);
            });
          });
        } else {
          this.newProspectsArray = theProspect;
          this.newProspectsArray.push(np)
          this.storage.set("newProspects",this.newProspectsArray).then(() => {
            this.newProspectsArray = [];
            this.storage.get("newProspects").then((data) => {
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
