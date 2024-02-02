import { Routes } from "@angular/router";
import { accountRoutes } from "./accounts/accounts.routes";
import { documentRoutes } from "./documents/document.routes";
import { boxRoutes } from "./boxes/boxes.routes";
import { boxMovementRoutes } from "./box-movements/box-movements.routes";

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
    {
        path: 'box-movement',
        children: boxMovementRoutes,
    },
];
