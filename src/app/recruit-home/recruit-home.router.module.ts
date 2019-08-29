import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruitHomePage } from './recruit-home.page';

const routes: Routes = [
  {
    path: '',
    component: RecruitHomePage,
    children: [
      {
        path: 'show-prospects',
        children: [
          {
            path: '',
            loadChildren: '../recruit1/recruit1.module#Recruit1PageModule'
          }
        ]
      },
      {
        path: 'edit-prospect',
        children: [
          {
            path: '',
            loadChildren: '../recruit2/recruit2.module#Recruit2PageModule'
          }
        ]
      },
      {
        path: 'submit-prospects',
        children: [
          {
            path: '',
            loadChildren: '../recruit3/recruit3.module#Recruit3PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'show-prospects',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecruitRoutingModule {}
