import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RouterModule, Routes, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(
    public navCtrl:NavController,
    public router: Router
  ) { }
  goToPage(page){
    this.router.navigate([page]);
    //this.navCtrl.push();
  }
}
