import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { StudentFormPage } from './student-form.page';
import { MainFormComponent } from './main-form/main-form.component';


const routes: Routes = [
  {
    path: '',
    component: MainFormComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    //StudentFormPage,
    MainFormComponent
  ]
})
export class StudentFormPageModule {}
