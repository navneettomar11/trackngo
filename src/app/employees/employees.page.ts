import {Component, NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddempPage} from './addemp/addemp.page';
import {EmplistPage} from './emplist/emplist.page';
const routes: Routes = [
  { path: 'addemp', component: AddempPage },
  { path: 'emplist', component: EmplistPage },
];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
  })],
  exports: [RouterModule]
})

export class EmployeesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
