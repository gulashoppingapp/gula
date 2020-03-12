import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewitemPage } from './viewitem.page';

const routes: Routes = [
  {
    path: '',
    component: ViewitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewitemPageRoutingModule {}
