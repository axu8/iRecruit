import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WordpressService } from '../providers/wordpress.service';



@Component({
  selector: 'app-page',
  templateUrl: './page.page.html',
  styleUrls: ['./page.page.scss'],
})
export class PagePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wp: WordpressService
  ) {}

  pageData;

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.wp.retrievePagesByID( params.get('id') )
    ))
    .subscribe(data => {
      console.log(data);
      this.pageData = data;
    });
    console.log(this.pageData);
  }

}
