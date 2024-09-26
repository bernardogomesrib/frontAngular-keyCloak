import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MinIoComsService } from './api/services';
import { Oauth2AuthService } from './auth/oauth2-auth.service';
import { ButtonComponent } from "./components/ui/button/button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ButtonComponent,ButtonComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Oauth2AuthService],
})
export class AppComponent {
  title = 'keycloak-angular';
  isEditable = true;
  authService: Oauth2AuthService;
  profile: any;
  isLogado: boolean | undefined = false;

  constructor(private authServicee: Oauth2AuthService,private minIoComsService:MinIoComsService) {
    this.authService = authServicee;
    this.authService.init().then(() => {
      this.isLogado = this.authService.isAutenticated();
      this.profile = this.authService.profile;
    });

  }
  onFileChange(event:any){
    console.log(event);
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

  // postNewProfilePicture(params: PostMyProfilePicture$Params){
  //   this.minIoComsService.postMyProfilePicture(params).subscribe((res)=>{
  //     console.log(res);
  //   });
  // }


}
