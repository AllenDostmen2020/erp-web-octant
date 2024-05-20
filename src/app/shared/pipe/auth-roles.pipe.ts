import { Pipe, PipeTransform, inject } from '@angular/core';
import { UserRoleEnum } from '@interface/user';
import { AuthService } from '@service/auth.service';

@Pipe({
  name: 'authRoles',
  standalone: true
})
export class AuthRolesPipe implements PipeTransform {
  private authService = inject(AuthService);
  transform(roles: UserRoleEnum[], ...args: unknown[]): boolean {
    const userRole = this.authService.user()!.role!;
    return roles.includes(userRole);
  }

}
