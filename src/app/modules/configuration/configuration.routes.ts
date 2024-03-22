import { Routes } from "@angular/router";
import { bankRoutes } from "./banks/banks.routes";
import { planRoutes } from "./plans/plans.routes";
import { vehicleTypeRoutes } from "./vehicle-types/vehicle-types.routes";
import { codeCountryRoutes } from "./code-countries/code-countries.routes";

export const configurationRoutes: Routes = [
    {
        path: 'bank',
        children: bankRoutes,
    },
    {
        path: 'plan',
        children: planRoutes,
    },
    {
        path: 'vehicle-type',
        children: vehicleTypeRoutes,
    },
    {
        path: 'code-country',
        children: codeCountryRoutes,
    },
];
