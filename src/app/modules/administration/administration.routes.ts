import { Routes } from "@angular/router";
import { accountRoutes } from "./accounts/accounts.routes";
import { documentRoutes } from "./documents/document.routes";
import { boxRoutes } from "./boxes/boxes.routes";

export const administrationRoutes: Routes = [
    {
        path: 'account',
        children: accountRoutes,
    },
    {
        path: 'document',
        children: documentRoutes,
    },
    {
        path: 'box',
        children: boxRoutes,
    },
];
