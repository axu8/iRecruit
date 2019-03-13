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
import 'rxjs/add/operator/map';
import { StorageService } from "./storage-service";
var AuthenticationService = (function () {
    function AuthenticationService(http, storageService) {
        this.http = http;
        this.storageService = storageService;
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        this.res = {
            status: false,
            message: ""
        };
        // set token if saved in local storage
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        this.creds = {
            "ClientId": "1DB3C50D-C215-4463-A2A8-7141B5200561",
            "PartnerCode": "VMDSDR",
            "PartnerKey": "vmdsdrrmrejykpgzeuoe",
            "Password": password,
            "Username": username
        };
        this.body = JSON.stringify(this.creds);
        return this.http.post('http://topx.topschoolstage.com/Security/partnerlogin', this.body, { headers: this.headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            if (response.json().IsValid == true) {
                var token = response.json().Packets[0].SecurityToken;
                if (token) {
                    // set token property
                    _this.token = token;
                    console.log(token);
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    _this.storageService.setUserToken(token);
                    _this.storageService.setUserName(username);
                    // console.log(this.storageService.getUserToken());
                    // return true to indicate successful login
                    // if(response.json().Messages[0].Message){
                    //     this.res.message = response.json().Messages[0].Message;
                    // }
                    _this.res.status = true;
                    return _this.res;
                }
            }
            else {
                // return false to indicate failed login
                _this.res.message = response.json().Messages[0].Message;
                _this.res.status = false;
                return _this.res;
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.storageService.removeStoredUser();
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, StorageService])
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication-service.js.map