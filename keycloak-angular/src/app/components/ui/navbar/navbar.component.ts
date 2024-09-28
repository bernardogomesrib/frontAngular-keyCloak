import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { MinIoComsService } from '../../../api/services';
import { Oauth2AuthService } from '../../../auth/oauth2-auth.service';
import { UserProfile } from '../../../auth/user-profile';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private authService;
  isLogado: boolean | undefined = false;
  profile: UserProfile | undefined;
  constructor(private authServicee: Oauth2AuthService,private minIoComsService:MinIoComsService) {
    this.authService = authServicee;
    this.authService.init().then(() => {
      this.isLogado = this.authService.isAutenticated();
      this.profile = this.authService.profile;
    });
  }
  login() {
    this.authService.Oauth2login();
  }

  logout() {
    this.authService.Oauth2logout();
  }
  profilePage(){
    this.authService.goToProfilePage();
  }

  logoUrl = environment.logoUrl;
}
