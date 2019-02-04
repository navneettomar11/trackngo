import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HelpdeskPage } from './helpdesk.page';

const routes: Routes = [
  {
    path: '',
    component: HelpdeskPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HelpdeskPage]
})
export class HelpdeskPageModule {}
