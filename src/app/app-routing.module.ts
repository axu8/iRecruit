import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'registrar-auth', loadChildren: './registrar-auth/registrar-auth.module#RegistrarAuthPageModule' },
  { path: 'registrar-home', loadChildren: './registrar-home/registrar-home.module#RegistrarHomePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
