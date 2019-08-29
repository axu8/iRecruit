import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecruitHomePage } from './recruit-home.page';
import { RecruitRoutingModule } from './recruit-home.router.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecruitRoutingModule
    //RouterModule.forChild(routes)
  ],
  declarations: [RecruitHomePage]
})
export class RecruitHomePageModule {}
