import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { StorageService } from "./storage-service";
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class SisService {
  token;
  storage;
  url = 'http://topx.topschoolstage.com/Security/partnerlogin';
  api = 'http://topx.topschoolstage.com/';
  headers:HttpHeaders;
  
  /*
  headers = new HttpHeaders({
		'Content-Type': 'application/json',
    'Accept':'application/json',
    'TopSchoolSecurityToken': this.token
		//'TopSchoolSecurityToken': JSON.parse(localStorage.getItem('currentUser')).token
  });
  */
	creds: any;
  body: any;
	constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    storageService.getUserToken().then(token => {
      this.token = token;
      console.log('Token Is', this.token);
    });
    this.storage = storageService;
    
  }
  testAPI(str): Observable<any[]> {
    this.headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept','application/json')
    .set('TopSchoolSecurityToken', this.token);
    return this.http.get<any[]>(str,{ headers: this.headers })
    .pipe(
      map(data => data),
    )
  }
  // testAPI(str){
  //   return this.http.get(str, { headers: this.headers })
  //   .subscribe( res => res );
  // }
  getActiveStudents(status,pageCount,pageSize){
    this.headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept','application/json')
    .set('TopSchoolSecurityToken', this.token);
    return this.http.get<any[]>(`${this.api}Academics/students/${status}?pageIndex=${pageCount}&pageSize=${pageSize}`,{ headers: this.headers })
    .pipe(
      map(data => data),
    )
  }
  getStudentRegistrations(studentID){
    //let url = `http://topx.topschoolstage.com/Academics/students?studentNumber=${studentID}`
    let url = `http://topx.topschoolstage.com/Academics/students/${studentID}/registrations?`;
    let data: any;
    return this.http.get(url, { headers: this.headers })
    .subscribe( res => {
      console.log(res);
    });
  };
  getStudents(){
    let url = `http://topx.topschoolstage.com/Academics/students/`;
    let data: any;
    return this.http.get(url, { headers: this.headers })
    .subscribe( res => res );
  };
  getHoldTypes(){
    let url = `http://topx.topschoolstage.com/Academics/holdtypes`;
    let data: any;
    return this.http.get(url, { headers: this.headers })
    .subscribe( res => res );
  }
}
