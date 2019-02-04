import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AddressPage } from './address/address.page';
const routes: Routes = [
  { path: 'address', component: AddressPage },
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
  })],
  exports: [RouterModule]
})
export class ProfilePage implements OnInit {

  constructor(public navCtrl: NavController) {

  }
  public Pages = [
    {
      title: 'Address',
      url: '/profile/address',
      icon: 'contact'
    },
    {
      title: 'Number',
      url: '/profile/number',
      icon: 'phone'
    }
  ];


  ngOnInit() {
  }


}
