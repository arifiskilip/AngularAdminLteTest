import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';
import { FormGuard } from './guards/form-guard.guard';
import { loadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    FormGuard,
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      BrowserAnimationsModule,
      NgxSpinnerModule,
      JwtModule.forRoot({
        config:{
          tokenGetter:()=> localStorage.getItem("token"),
          allowedDomains:["localhost:7205"]
        }
      })
    )
  ]
};
