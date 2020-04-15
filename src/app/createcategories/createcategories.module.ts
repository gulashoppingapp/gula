import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatecategoriesPageRoutingModule } from './createcategories-routing.module';

import { CreatecategoriesPage } from './createcategories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatecategoriesPageRoutingModule
  ],
  declarations: [CreatecategoriesPage]
})
export class CreatecategoriesPageModule {}
