import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CulstermapPageRoutingModule } from './culstermap-routing.module';

import { CulstermapPage } from './culstermap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CulstermapPageRoutingModule
  ],
  declarations: [CulstermapPage]
})
export class CulstermapPageModule {}
