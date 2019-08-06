import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss'],
})
export class MainSidebarComponent implements OnInit {
  public sideMenuPages = [
    {
      title: 'Recruiters',
      url: '/registrar-auth',
      icon: 'list'
    },
    {
      title: 'Brochure',
      url: '/brochureHome',
      icon: 'list'
    }
  ];
  constructor() { }

  ngOnInit() {}

}
