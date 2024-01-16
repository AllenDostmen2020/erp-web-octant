
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RECAPTCHA_LOADER_OPTIONS, RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RecaptchaV3Module } from 'ng-recaptcha';
import { AuthService } from 'src/app/core/services/auth.service';
import { FetchService } from 'src/app/core/services/fetch.service';
import { SpinnerDefaultComponent } from '../../../shared/components/spinner-default/spinner-default.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { FetchErrorResponse } from 'src/app/shared/interfaces/fetch';

interface ResponseLogin {
  access_token: string;
  token_type: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SpinnerDefaultComponent,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: "6Ldb0DIpAAAAAEvjUicIYq_Yqoq7u1RmGZGsEcVq" } as RecaptchaSettings,
    },
  ],
})
export class LoginComponent {
  private fetch = inject(FetchService);
  private authService = inject(AuthService);

  public isLogin: boolean = true;
  public formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    recaptchaToken: new FormControl('', [Validators.required])
  });
  public formResetPassword:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  public loading: WritableSignal<boolean> = signal(false);

  public changeType() {
    this.isLogin = !this.isLogin;
  }

  public submitFormLogin() {
    if (this.loading()) return;
    this.formLogin.markAllAsTouched();
    if (this.formLogin.valid) { this.login() }
  }

  private async login() {
    this.loading.set(true);
    try {
      const response = await this.fetch.post<ResponseLogin>('login', this.formLogin.value, { 
        ignoreAuthorization: true, 
        confirmDialog: false,
        toast: {
          loading: 'Iniciando sesión...',
          success: 'Sesión iniciada correctamente',
          error: (error: FetchErrorResponse) => {
            if(error.status == 401) return 'Credenciales incorrectas';
            return 'Error al iniciar sesión';
          }
        }
      });
      this.reponseLogin(response);
    } catch (error) { }
    this.loading.set(false);
  }

  private reponseLogin(data: ResponseLogin) {
    const token = data?.access_token;
    if (token) {
      this.authService.setToken(token);
      this.authService.redirectToPrincipalRoute();
    }
  }

  public submitFormResetPassword() { }

}
