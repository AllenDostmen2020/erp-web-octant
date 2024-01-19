import { Routes } from "@angular/router";
import { contractRoutes } from "./contracts/contract.routes";

export const trackingRoutes: Routes = [
    {
        path: 'contract',
        children: contractRoutes,
    },
]