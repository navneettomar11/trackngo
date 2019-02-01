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
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
