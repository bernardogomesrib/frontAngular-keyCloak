import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { interval, lastValueFrom, switchMap } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { MinIoFileUrl } from '../api/models';
import { MinIoComsService, PingPongControllerService } from '../api/services';
import { environment } from './../../environments/environment.development';
import { UserProfile } from './user-profile';
@Injectable({
  providedIn: 'root'
})
export class Oauth2AuthService {
  private _keycloak: Keycloak | undefined;

  constructor(private httpClient: HttpClient, private minIoComsService: MinIoComsService,private pingPongControllerService:PingPongControllerService){}

  private hasProfilePicture = false;

  get kc() {

    if (!this._keycloak) {
      const location = window.location.href.split(":");
      console.log(location[0]+":"+location[1]);
      this._keycloak = new Keycloak({
        url: location[0]+":"+location[1]+":9080",
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      });
    }
    return this._keycloak;
  }

  private _profile: UserProfile | undefined;
  MIN_TOKEN_VALIDITY = 60000;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init() {
    try {

      const authenticated = await this.kc.init({
        onLoad: 'login-required',
      });
      if (authenticated) {

        this._profile = (await this.kc.loadUserProfile()) as UserProfile;
        this._profile.token = this.kc.token || '';
        this._profile.roles = this.kc.realmAccess?.roles || [];
        localStorage.setItem('token', this._profile.token);
        localStorage.setItem('refresh_token', this.kc.refreshToken || '');
        await this.getMyPfp();
        this.initUpdateTokenRefresh();
      }else{
        console.log("keycloak não autenticado");
      }
    } catch (error) {
      console.log("erro ao iniciar keycloak",error);
    }
  }
  initUpdateTokenRefresh() {
    interval(this.MIN_TOKEN_VALIDITY )
      .pipe(
        switchMap(() => fromPromise(this.kc.updateToken(this.MIN_TOKEN_VALIDITY )))
      ).subscribe({
      next: refreshed => {
        if (refreshed) {
          const token = this.kc.token;
          localStorage.setItem('token', token || '');
          if(this.profile){
            this._profile!.token = token || '';
          }
        }
      },
      error: err => console.error("Failed to refresh token" + err)
    });
  }



async getMyPfp() {
  try {
    if (this._profile) {
      if (this._profile.profilePicture) {
        return this._profile.profilePicture;
      } else {
        const response = await lastValueFrom(this.minIoComsService.getMyProfilePicture$Response());
        const fileUrl: MinIoFileUrl = response.body;
        if (fileUrl && fileUrl.url) {
          this._profile!.profilePicture = fileUrl.url;
          this.hasProfilePicture = true;
        } else {
          console.log(fileUrl.status);
        }

        return this._profile?.profilePicture;
      }
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Erro ao pegar a imagem de perfil', error);
    return undefined;
  }
}
  Oauth2login() {
    return this.kc.login();
  }

  Oauth2logout() {
    return this.kc.logout({redirectUri: 'http://localhost:4200'});
  }

  goToProfilePage(){
    return this.kc.accountManagement();
  }
  isAutenticated() {
    return this.kc.authenticated;
  }

  // async updateProfilePicture(formData: FormData){
  //   if(this._profile){
  //     postMyProfilePicture(this._httpClient!, environment.apiUrl, { token: this._profile.token }, formData);
  //   }
  // }

}
