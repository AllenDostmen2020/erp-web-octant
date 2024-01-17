import { Routes } from "@angular/router";

export const settingsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/settings-sidenav/settings-sidenav.component').then(m => m.SettingsSidenavComponent),
        children: [],
    }
];