import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeoleafletPageRoutingModule } from './geoleaflet-routing.module';

import { GeoleafletPage } from './geoleaflet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeoleafletPageRoutingModule
  ],
  declarations: [GeoleafletPage]
})
export class GeoleafletPageModule {}
