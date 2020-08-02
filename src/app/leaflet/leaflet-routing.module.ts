import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeafletPage } from './leaflet.page';

const routes: Routes = [
  {
    path: '',
    component: LeafletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeafletPageRoutingModule {}
