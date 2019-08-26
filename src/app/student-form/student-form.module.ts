import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { StudentFormPage } from './student-form.page';
import { MainFormComponent } from './main-form/main-form.component';
import { KeypadComponent } from '../keypad/keypad.component';
// import { PinpadPage } from '../pinpad/pinpad.page';
// import { PinpadPage } from '../pinpad/pinpad.page';
import { PinpadComponent } from './pinpad/pinpad.component';
// import { PinpadPageModule } from '../pinpad/pinpad.module';


const routes: Routes = [
  {
    path: '',
    component: MainFormComponent
  },
  // {
  //   path: 'home',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // PinpadPageModule
  ],
  bootstrap: [
    
  ],
  declarations: [
    //StudentFormPage,
    MainFormComponent,
    //KeypadComponent
    PinpadComponent
  ],
  entryComponents: [
    PinpadComponent
  ]
})
export class StudentFormPageModule {}
