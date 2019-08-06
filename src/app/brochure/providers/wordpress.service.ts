import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
// export class WordpressService {

//   constructor() { }
// }
export class WordpressService {
  baseUrl: string = "http://recruit.nossi.online/wp-json/wp/v2/";
  http;
  
  constructor(http:HttpClient){
    this.http = http;

  }

  retrievePagesByID(pageID){
    return this.http.get(this.baseUrl + 'pages/' + pageID)
    .pipe(
      map(res => res)
    )
  }
  retrievePages(){
    return this.http.get(this.baseUrl + 'pages')
    .pipe(
      map(res => res)
    )
  }
  retrieveCategories(){
    return this.http.get(this.baseUrl + 'categories')
    .pipe(
      map(res => res)
    )
  }

  retrievePostsInCategory(categoryId: number){
    return this.http.get(this.baseUrl + 'posts?categories=' + categoryId)
     .pipe(
      map(res => res)
    )
  }

}