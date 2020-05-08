import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CulstermapPage } from './culstermap.page';

const routes: Routes = [
  {
    path: '',
    component: CulstermapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CulstermapPageRoutingModule {}
