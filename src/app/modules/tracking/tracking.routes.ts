import { Routes } from "@angular/router";
import { contractRoutes } from "./contracts/contract.routes";

export const trackingRoutes: Routes = [
    {
        path: 'contracts',
        children: contractRoutes,
    }
]