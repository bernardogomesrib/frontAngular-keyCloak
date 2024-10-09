import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'; // Import MatSidenav
import { MatToolbarModule } from '@angular/material/toolbar';
import { environment } from '../../../../environments/environment.development';
import { MinIoComsService } from '../../../api/services';
import { Oauth2AuthService } from '../../../auth/oauth2-auth.service';
import { UserProfile } from '../../../auth/user-profile';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, CommonModule,MatSidenavModule, MatCheckboxModule, FormsModule, MatToolbarModule, MatButtonModule, MatIconModule], // Add MatSidenavModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarComponent {
  isLogado: boolean | undefined = false;
  profile: UserProfile | undefined;
  events: string[] = [];
  opened: boolean = false;
  constructor(
    private authServicee: Oauth2AuthService,
    private minIoComsService: MinIoComsService
  ) {
    this.authServicee.init().then(() => {
      this.isLogado = this.authServicee.isAutenticated();
      this.profile = this.authServicee.profile;
    });
  }

  login() {
    this.authServicee.Oauth2login();
  }

  logout() {
    this.authServicee.Oauth2logout();
  }

  profilePage() {
    this.authServicee.goToProfilePage();
  }


  toggle(sidenav:any){
    console.log("apertei");
    sidenav.toggle();
  }

  logoUrl = environment.logoUrl;

  showFiller = false;

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
