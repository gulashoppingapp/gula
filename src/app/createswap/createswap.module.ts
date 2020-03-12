import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateswapPageRoutingModule } from './createswap-routing.module';

import { CreateswapPage } from './createswap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateswapPageRoutingModule
  ],
  declarations: [CreateswapPage]
})
export class CreateswapPageModule {}
