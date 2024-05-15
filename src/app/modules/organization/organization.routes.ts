import { Routes } from "@angular/router";
import { clientRoutes } from "./clients/clients.routes";
import { userRoutes } from "./users/users.routes";
import { isEnableRolesGuard } from "@guard/auth.guard";
import { UserRoleEnum } from "@interface/user";

export const organizationRoutes: Routes = [
    {
        path: 'client',
        children: clientRoutes,
        canActivate: [isEnableRolesGuard],
        data: { authRoles: [UserRoleEnum.MASTER, UserRoleEnum.KAM, UserRoleEnum.ADMINISTRACIÓN, UserRoleEnum.SOPORTE, UserRoleEnum.TESORERÍA] }
    },
    {
        path: 'user',
        children: userRoutes,
    },
];