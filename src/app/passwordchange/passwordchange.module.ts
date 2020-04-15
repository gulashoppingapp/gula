import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordchangePageRoutingModule } from './passwordchange-routing.module';

import { PasswordchangePage } from './passwordchange.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordchangePageRoutingModule
  ],
  declarations: [PasswordchangePage]
})
export class PasswordchangePageModule {}
