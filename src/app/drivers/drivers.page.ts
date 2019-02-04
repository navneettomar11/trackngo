import {Component, NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdddriverPage } from './adddriver/adddriver.page';
import { DriverslistPage } from './driverslist/driverslist.page';

const routes: Routes = [
  { path: 'adddriver', component: AdddriverPage },
  { path: 'driverslist', component: DriverslistPage }
];

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
  })],
  exports: [RouterModule]
})

export class DriversPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
