import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatesubcategoriesPageRoutingModule } from './createsubcategories-routing.module';

import { CreatesubcategoriesPage } from './createsubcategories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatesubcategoriesPageRoutingModule
  ],
  declarations: [CreatesubcategoriesPage]
})
export class CreatesubcategoriesPageModule {}
