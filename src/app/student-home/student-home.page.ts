import { Component, OnInit } from '@angular/core';
import { WordpressService  } from '../providers/wordpress.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {

  constructor(
    // public router: Router, 
    public wp: WordpressService,
    public router: Router
  ){
    // this.retrieveCategories();
    //this.retrievePages();
  }
  goHome(){
    this.router.navigate(['']);
  }
  showPage(pageID){
    this.router.navigate(['page', pageID]);
  }
  showDegreePage(pageID,gallery,curriculum){
    this.router.navigate(['degree-page', pageID, gallery, curriculum]);
  }
  // showPage(pageID){
  //   this.router.navigate(['page', pageID]);
  // }
  ionViewDidLoad(){
    // this.wp.retrieveCategories().subscribe(results => {
    //   this.categories = results.json;
      
    // });
  }
  retrieveCategories(){
    this.wp.retrieveCategories().subscribe(results => {
      //this.categories = <Response>results.json();
    });
  }

  ngOnInit() {
  }

}
