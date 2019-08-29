import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Recruit1Page } from './recruit1.page';
import { Prospect } from '../student-form/prospect-model';
import { ProspectDetailsComponent } from './prospect-details/prospect-details.component';

const routes: Routes = [
  {
    path: '',
    component: Recruit1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    Recruit1Page,
    ProspectDetailsComponent
  ],
  entryComponents: [
    ProspectDetailsComponent
  ]
})
export class Recruit1PageModule {}
