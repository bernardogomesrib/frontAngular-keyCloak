import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "./components/ui/button/button.component";
import { NavbarComponent } from "./components/ui/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ButtonComponent, ButtonComponent, FormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent {
  title = 'keycloak-angular';
  isEditable = true;

  constructor() {
  }
  onFileChange(event:any){
    console.log(event);
  }

  // postNewProfilePicture(params: PostMyProfilePicture$Params){
  //   this.minIoComsService.postMyProfilePicture(params).subscribe((res)=>{
  //     console.log(res);
  //   });
  // }


}
