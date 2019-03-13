import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { StorageService } from "./storage-service";


@Injectable()
export class AuthenticationService {
    public token: string;
    headers = new HttpHeaders({'Content-Type': 'application/json','Accept':'application/json'});
    creds: any;
    body: any;
    res = {
        status: false,
        message: ""
    };

    constructor(private http: HttpClient, private storageService: StorageService) {
        // set token if saved in local storage
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }
    
    login(username: string, password: string): Observable<any> {
        this.creds = {
            "ClientId":"1DB3C50D-C215-4463-A2A8-7141B5200561",
            "PartnerCode":"VMDSDR",
            "PartnerKey":"vmdsdrrmrejykpgzeuoe",
            "Password":password,
            "Username":username
        }
        this.body = JSON.stringify(this.creds);
        return this.http.post('http://topx.topschoolstage.com/Security/partnerlogin', this.body, {headers: this.headers})
            .map((response: Response) => {
                console.log(response);
                // login successful if there's a jwt token in the response
                if(response['IsValid'] == true){
                    let token = response['Packets'][0].SecurityToken;
                    if (token) {
                        // set token property
                        this.token = token;
                        console.log(token);

                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        //localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                        this.storageService.setUserToken(token);
                        this.storageService.setUserName(username);
                        // console.log(this.storageService.getUserToken());
                        // return true to indicate successful login
                        // if(response.json().Messages[0].Message){
                        //     this.res.message = response.json().Messages[0].Message;
                        // }
                        this.res.status = true;
                        return this.res;
                    } 
                } else {
                    // return false to indicate failed login
                    this.res.message = response['Messages'][0].Message;
                    this.res.status = false;
                    return this.res;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.storageService.removeStoredUser();
    }
}