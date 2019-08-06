import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrochureModule } from './brochure/brochure.module'
import { MainComponent } from './main/main.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  //{ path: '', component: MainComponent},
  //{ path: 'registrar-auth', component: BrochureModule },
  { path: 'registrar-auth', loadChildren: './registrar-auth/registrar-auth.module#RegistrarAuthPageModule' },
  { path: 'registrar-home', loadChildren: './registrar-home/registrar-home.module#RegistrarHomePageModule' },
  { path: 'brochureHome', loadChildren: './brochure/brochure.module#BrochureModule' },
  { path: 'schedule-manager', loadChildren: './schedule-manager/schedule-manager.module#ScheduleManagerPageModule' },
  {
    path: "bcontent",
    component: MainComponent,
    outlet: "brochureContent"
  },
  { path: 'student-form', loadChildren: './student-form/student-form.module#StudentFormPageModule' }
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
