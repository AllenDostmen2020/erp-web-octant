import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { User, UserRoleEnum } from "@interface/user";
import { AuthService } from "@service/auth.service";
import { FetchService } from "@service/fetch.service";
import { ToastService } from "@service/toast.service";

export const masterRoleGuard = () => {
    const authService = inject(AuthService);
    const user = authService.user();
    return user?.role === UserRoleEnum.MASTER;
}

export const isNotLoggedGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isLogged = authService.isLogged();
    if (isLogged) router.navigate(['/']);
    return !isLogged;
}

export const isLoggedGuard = async () => {
    const fetchService = inject(FetchService);
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();
    if (!token) {
        authService.removeToken();
        router.navigate(['/login']);
        return false;
    }
    try {
        const response = await fetchService.get<User>('auth/user');
        authService.setUser(response);
        return true;
    } catch (error:any) {
        if(error.status === 401) {
            authService.removeToken();
            router.navigate(['/login']);
        }
        return false;
    }
}

export const isEnableRolesGuard: CanActivateFn = (activatedRouteSnapshot) => {
    const roles = ((activatedRouteSnapshot.data as any).authRoles ?? []) as UserRoleEnum[];
    const authService = inject(AuthService);
    const toast = inject(ToastService);
    const user = authService.user()!;
    const status = roles.includes(user!.role as UserRoleEnum);
    if(!status) toast.open('No tienes permisos para acceder a esta página', {
        duration: 3,
        icon: 'error',
        title: 'Error de permisos'
    })
    return status;
}
