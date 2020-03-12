import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateswapPage } from './createswap.page';

const routes: Routes = [
  {
    path: '',
    component: CreateswapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateswapPageRoutingModule {}
