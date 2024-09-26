import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { httpTokenInterceptor } from './auth/Interceptor/http-token.interceptor';
import { Oauth2AuthService } from './auth/oauth2-auth.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(withInterceptors([httpTokenInterceptor])),Oauth2AuthService],
};
