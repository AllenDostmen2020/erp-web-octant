import { Routes } from "@angular/router";
import { contractRoutes } from "./contracts/contract.routes";
import { vehicleRoutes } from "./vehicles/vehicles.routes";

export const trackingRoutes: Routes = [
    {
        path: 'contract',
        children: contractRoutes,
    },
    {
        path: 'vehicle',
        children: vehicleRoutes,
    },
]
