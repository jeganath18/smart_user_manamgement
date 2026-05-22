import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { AdminPanel } from './features/admin/admin-panel/admin-panel';
// import { DashboardHomeComponent } from './features/dashboard/dashboard-home';

const routes: Routes = [
  {
    path: '',
    component: Login
  },
//   {
//     path: 'dashboard',
//     component: DashboardHomeComponent
//   },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}