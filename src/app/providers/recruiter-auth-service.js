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
import { Http, Headers } from '@angular/http';
// import { IonicPage, NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/*
  Generated class for the RecruiterAuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var RecruiterAuthService = (function () {
    function RecruiterAuthService(http) {
        this.http = http;
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    }
    RecruiterAuthService.prototype.getAuth = function (un, up) {
        var _this = this;
        this.creds = {
            "ClientId": "1DB3C50D-C215-4463-A2A8-7141B5200561",
            "PartnerCode": "VMDSDR",
            "PartnerKey": "vmdsdrrmrejykpgzeuoe",
            "Password": up,
            "Username": un
        };
        this.body = JSON.stringify(this.creds);
        //console.log(this.body);
        this.http.post("http://topx.topschoolstage.com/Security/partnerlogin", this.body, { headers: this.headers })
            .map(function (response) {
            _this.res = response.json();
        })
            .subscribe(function (data) {
            if (_this.res.IsValid == true) {
                alert("Login Successful");
            }
            else {
                _this.reqStatus = _this.res.IsValid;
                alert(_this.res.Messages[0].Message);
            }
            console.log(_this.res);
        }, function (err) { return console.log("Sorry: " + err); }, function () { return console.log("Authentication Complete. . ."); });
        return this.reqStatus;
    };
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
    RecruiterAuthService.prototype.test = function () {
        alert("ras test");
    };
    RecruiterAuthService.prototype.makePostRequest = function () {
        this.http.post("https://httpbin.org/post", "firstname=Nic")
            .subscribe(function (data) {
            /*var Alert = alert.create({
                title: "Data String",
                subTitle: data.json().data,
                buttons: ["close"]
            });
            this.navCtrl.present(alert);*/
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    RecruiterAuthService.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad RecruitAuth');
    };
    return RecruiterAuthService;
}());
RecruiterAuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], RecruiterAuthService);
export { RecruiterAuthService };
//# sourceMappingURL=recruiter-auth-service.js.map