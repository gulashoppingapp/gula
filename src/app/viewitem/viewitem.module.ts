import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewitemPageRoutingModule } from './viewitem-routing.module';

import { ViewitemPage } from './viewitem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewitemPageRoutingModule
  ],
  declarations: [ViewitemPage]
})
export class ViewitemPageModule {}
