import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LocationPage } from './location/location.page';
const routes: Routes = [
  { path: 'address', component: LocationPage },
];

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
  })],
  exports: [RouterModule]
})
export class MyprofilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
