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
import { Data } from './data';
import 'rxjs/add/operator/map';
/*
  Generated class for the SubmitProspectService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var SubmitProspectService = (function () {
    function SubmitProspectService(http, _data) {
        var _this = this;
        this.http = http;
        this._data = _data;
        this.prospects = [];
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'TopSchoolSecurityToken': JSON.parse(localStorage.getItem('currentUser')).token
        });
        this.res = {
            message: ''
        };
        this._data.Prospects.subscribe(function (prospects) {
            //this.prospects = prospects; 
            _this.prospects.push(prospects);
            //console.log(this.prospects);
        });
        console.log(JSON.stringify(this.prospects));
        //this.prospects = data;
    }
    SubmitProspectService.prototype.send = function () {
        var _this = this;
        var newId = String(Math.round(Math.random() * 10000));
        var opportunityId = String(Math.round(Math.random() * 10000));
        var uniqueId = String(Math.round(Math.random() * 10000));
        var randomId = String(Math.round(Math.random() * 10000000));
        var randomAddressNumber = String(Math.round(Math.random() * 100));
        var randomAddressNumber2 = String(Math.round(Math.random() * 100));
        var randomPhone1 = String(Math.round(Math.random() * 899) + 100);
        var randomPhone2 = String(Math.round(Math.random() * 899) + 100);
        var randomPhone3 = String(Math.round(Math.random() * 899) + 100);
        this.creds = {
            "Opportunity": {
                "IsDefault": true,
                "OpportunityId": newId,
                "ProspectId": opportunityId
            },
            "Prospect": {
                "Address": randomAddressNumber + " Fake St.",
                "Address2": randomAddressNumber + " Fake St.",
                "City": "Nashville",
                "Country": "USA",
                "CountryOfCitizenship": "USA",
                "County": "Davidson",
                "DoNotCallIndicator": true,
                "DoNotEmailIndicator": true,
                "EmailAddress": this.prospects[0].emailAddress,
                "FirstName": this.prospects[0].firstName,
                "Gender": "female",
                "HispanicOfAnyRace": true,
                "HomePhoneNumber": "1615654" + randomPhone3,
                "Id": randomId,
                "LastName": this.prospects[0].lastName,
                "MobilePhoneNumber": "1615654" + randomPhone2,
                "PostalCode": "37216",
                "Prefix": "ms.",
                "State": "tn",
                "UniqueId": uniqueId,
                "WorkPhoneNumber": "1615654" + randomPhone1
            }
        };
        //this.body = JSON.stringify(this.creds);
        this.body = this.creds;
        return this.http.post('http://topx.topschoolstage.com/Recruitment/prospects', this.body, { headers: this.headers })
            .map(function (response) {
            _this.res.message = response.json().Messages[0].Message;
            return _this.res;
        });
    };
    return SubmitProspectService;
}());
SubmitProspectService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Data])
], SubmitProspectService);
export { SubmitProspectService };
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
//# sourceMappingURL=submit-prospect-service.js.map