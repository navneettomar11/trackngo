import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate:[AuthGuard],
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    canActivate:[AuthGuard],
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'employees', loadChildren: './employees/employees.module#EmployeesPageModule' },
  { path: 'drivers', loadChildren: './drivers/drivers.module#DriversPageModule' },
  { path: 'driverslist', loadChildren: './drivers/driverslist/driverslist.module#DriverslistPageModule' },
  { path: 'adddriver', loadChildren: './drivers/adddriver/adddriver.module#AdddriverPageModule' },
  { path: 'myprofile', loadChildren: './myprofile/myprofile.module#MyprofilePageModule' },
  { path: 'location', loadChildren: './myprofile/location/location.module#LocationPageModule' },
  { path: 'helpdesk', loadChildren: './helpdesk/helpdesk.module#HelpdeskPageModule' },
  { path: 'addemp', loadChildren: './employees/addemp/addemp.module#AddempPageModule' },
  { path: 'emplist', loadChildren: './employees/emplist/emplist.module#EmplistPageModule' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
