import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserRoleEnum } from "@interface/user";
import { AuthService } from "@service/auth.service";
import { FetchService } from "@service/fetch.service";

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
    } catch (error) {
        return false;
    }
}
