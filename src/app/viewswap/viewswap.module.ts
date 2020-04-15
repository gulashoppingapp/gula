import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewswapPageRoutingModule } from './viewswap-routing.module';

import { ViewswapPage } from './viewswap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewswapPageRoutingModule
  ],
  declarations: [ViewswapPage]
})
export class ViewswapPageModule {}
