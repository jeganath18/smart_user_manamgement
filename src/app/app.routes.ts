import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { DashboardHome } from './features/dashboard/dashboard-home/dashboard-home';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: Login
    },
    {
        path: 'dashboard',
        component: DashboardHome
    }
];