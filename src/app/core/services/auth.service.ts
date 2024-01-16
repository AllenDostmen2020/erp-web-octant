import { Injectable, inject, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NAME_TOKEN } from '@interface/fetch';
import { User } from '@interface/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private router = inject(Router);

    public user: WritableSignal<User | null> = signal(null);

    public setUser(user: User): void {
        this.user.set(user);
    }

    public setToken(token: string): void {
        localStorage.setItem(NAME_TOKEN, token);
    }

    public getToken(): string | null {
        return localStorage.getItem(NAME_TOKEN);
    }

    public removeToken(): void {
        localStorage.removeItem(NAME_TOKEN);
    }

    public isLogged(): boolean {
        return !!this.getToken();
    }

    public logout(): void {
        this.removeToken();
        this.user.set(null);
        this.router.navigate(['/login']);
    }

    public redirectToLogin(routeLogin: string = '/login'): void {
        this.router.navigate([routeLogin]);
    }

    public redirectToPrincipalRoute(principalRoute: string = '/'): void {
        this.router.navigate([principalRoute]);
    }


}
