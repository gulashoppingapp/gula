import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatecategoriesPage } from './createcategories.page';

const routes: Routes = [
  {
    path: '',
    component: CreatecategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatecategoriesPageRoutingModule {}
