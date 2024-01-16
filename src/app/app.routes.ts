import { Routes } from '@angular/router';
import { isLoggedGuard, isNotLoggedGuard } from '@guard/auth.guard';
import { panelRoutes } from './panel.routing';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/components/login/login.component').then((m) => m.LoginComponent),
    canActivate: [isNotLoggedGuard]
  },
  {
    path: '',
    loadComponent: () => import('./control-panel/sidenav-panel/sidenav/sidenav.component').then(m => m.SidenavComponent),
    children: panelRoutes,
    canActivate: [isLoggedGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];
