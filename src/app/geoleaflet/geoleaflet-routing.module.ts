import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeoleafletPage } from './geoleaflet.page';

const routes: Routes = [
  {
    path: '',
    component: GeoleafletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeoleafletPageRoutingModule {}
