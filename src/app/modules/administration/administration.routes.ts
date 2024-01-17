import { Routes } from "@angular/router";
import { accountRoutes } from "./accounts/accounts.routes";

export const administrationRoutes: Routes = [
    {
        path: 'account',
        children: accountRoutes,
    },
];
