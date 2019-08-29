import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrochureModule } from './brochure/brochure.module'
import { MainComponent } from './main/main.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
// import { KeypadComponent } from './keypad/keypad.component';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  //{ path: '', component: MainComponent},
  //{ path: 'registrar-auth', component: BrochureModule },
  // {
  //   path: 'recruiters',
  //   children: [
  //     { path: 'login', loadChildren: './registrar-auth/registrar-auth.module#RegistrarAuthPageModule' },
  //     { path: 'registrar-home', loadChildren: './registrar-home/registrar-home.module#RegistrarHomePageModule' }
  //  ]
  // },
  { path: 'brochureHome', loadChildren: './brochure/brochure.module#BrochureModule' },
  { path: 'schedule-manager', loadChildren: './schedule-manager/schedule-manager.module#ScheduleManagerPageModule' },
  // {
  //   path: "bcontent",
  //   component: MainComponent,
  //   outlet: "brochureContent"
  // },
  { path: 'student-form', loadChildren: './student-form/student-form.module#StudentFormPageModule' },

  {
    path: 'recruiters',
    loadChildren: './recruit-home/recruit-home.module#RecruitHomePageModule'
  },
  {
    path: 'students',
    children: [
      { path: 'student-form', loadChildren: './student-form/student-form.module#StudentFormPageModule' },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      { path: 'home', loadChildren: './student-home/student-home.module#StudentHomePageModule'},
      { path: 'list', loadChildren: './list/list.module#ListPageModule' },
      { path: 'category-list', loadChildren: './category-list/category-list.module#CategoryListPageModule' },
      { path: 'post', loadChildren: './post/post.module#PostPageModule' },
      { path: 'page/:id', loadChildren: './page/page.module#PagePageModule' },
      { path: 'degree-page/:id/:gal/:cur', loadChildren: './degree-page/degree-page.module#DegreePagePageModule' }
      // { path: 'keypad', component: KeypadComponent }
      //{ path: 'pinpad', loadChildren: './pinpad/pinpad.module#PinpadPageModule' }
 
    ]
  }
  //,
  // { path: 'recruit1', loadChildren: './recruit1/recruit1.module#Recruit1PageModule' },
  // { path: 'recruit2', loadChildren: './recruit2/recruit2.module#Recruit2PageModule' },
  // { path: 'recruit3', loadChildren: './recruit3/recruit3.module#Recruit3PageModule' },
  // { path: 'recruit-home', loadChildren: './recruit-home/recruit-home.module#RecruitHomePageModule' }
];

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
