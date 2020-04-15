import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatesubcategoriesPage } from './createsubcategories.page';

const routes: Routes = [
  {
    path: '',
    component: CreatesubcategoriesPage
  },
  {path: ':category', component: CreatesubcategoriesPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatesubcategoriesPageRoutingModule {}
