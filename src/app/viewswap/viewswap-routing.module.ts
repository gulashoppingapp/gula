import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewswapPage } from './viewswap.page';

const routes: Routes = [
  {
    path: '',
    component: ViewswapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewswapPageRoutingModule {}
