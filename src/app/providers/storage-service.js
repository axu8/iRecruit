var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the StoreProspectsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var StorageService = (function () {
    function StorageService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.newProspectsArray = [];
        //console.log('Hello StoreProspect Service Provider');
    }
    StorageService.prototype.setUserToken = function (tokenValue) {
        this.storage.set("token", tokenValue);
    };
    StorageService.prototype.setUserName = function (userNameValue) {
        this.storage.set("username", userNameValue);
    };
    StorageService.prototype.getUserToken = function () {
        var _this = this;
        this.storage.get("token").then(function (val) {
            console.log("val is", val);
            _this.tokenVal = val;
        });
        return this.tokenVal;
        //console.log("Token is :" + this.token);
    };
    StorageService.prototype.removeStoredUser = function () {
        this.storage.remove("token");
        this.storage.remove("username");
    };
    StorageService.prototype.setNewProspect = function (np) {
        //console.log("NP is: " + JSON.stringify(np));
        this.newProspectsArray.push(np);
        console.log(this.storage.set("newProspects", "Newb").then(function (data) { return data[0]; }));
        console.log(this.newProspectsArray);
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
    };
    StorageService.prototype.getProspects = function () {
        var _this = this;
        this.storage.get("newProspects")
            .then(
        //(val) => { this.newProspectsArray = JSON.parse(val); },
        function (err) { /* this.storage.set("newProspects", "[]"); */ _this.newProspectsArray = []; });
        return this.newProspectsArray;
        //console.log("Token is :" + this.token);
    };
    return StorageService;
}());
StorageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage])
], StorageService);
export { StorageService };
//# sourceMappingURL=storage-service.js.map