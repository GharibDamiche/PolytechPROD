import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardComponent0 } from './dashboard0/dashboard0.component';
import { DashboardComponent00 } from './dashboard00/dashboard00.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
   {
    path: 'dashboard0',
    component: DashboardComponent0,
  },
  {
    path: 'dashboard00',
    component: DashboardComponent00,
  },
 {
    path: '',
    redirectTo: 'iot-dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
