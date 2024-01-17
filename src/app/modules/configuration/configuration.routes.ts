import { Routes } from "@angular/router";
import { bankRoutes } from "./banks/banks.routes";

export const configurationRoutes: Routes = [
    {
        path: 'bank',
        children: bankRoutes,
    },
];
