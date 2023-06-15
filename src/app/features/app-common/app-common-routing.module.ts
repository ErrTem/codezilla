import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./home/home/home.component";
import { InventoryComponent } from "./inventory/inventory/inventory.component";
import { ReportsComponent } from "./reports/reports/reports.component";
import { BillingComponent } from "./billing/billing/billing.component";
import { ProfileComponent } from "./profile/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'billing',
    component: BillingComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCommonRoutingModule { }
