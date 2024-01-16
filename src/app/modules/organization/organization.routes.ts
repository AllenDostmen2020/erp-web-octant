import { Routes } from "@angular/router";
import { clientRoutes } from "./clients/clients.routes";
import { userRoutes } from "./users/users.routes";

export const organizationRoutes: Routes = [
    {
        path: 'client',
        children: clientRoutes,
    },
    {
        path: 'user',
        children: userRoutes,
    },
];