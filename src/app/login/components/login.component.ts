import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { loginPayload } from '../models/login.model';
import { AuthService } from '../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetUIService } from 'src/app/shared/services/gui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  public user:User;

  private payload: loginPayload = new loginPayload();


  constructor(
      /**
     * Servicio de Proveedor de Data de Login
     */
      private userService: UserService,
      /**
       * Servicio de Alertas Graficas.
       */
      private sweetUIService: SweetUIService,
      /**
       * Loading Spinner
       */
      private spinner: NgxSpinnerService,
      /**
       * Auth Service
       */
      private authService: AuthService

    ) {



    this.user = new User(0,'','','','','','','',new Date(),true);

  }

  ngOnInit(): void {

  }



  public setUserEmail(event: any): void {
    this.payload.email = event.target.value;
  }

  public setUserPassword(event: any): void {
    this.payload.password = event.target.value;
  }


  /*
  onSubmit(form:NgForm){
    this.userService.signup(this.user).subscribe(response=>{
      console.log(response);
      this.userService.getIdentity();//saca indentidad de usuario logeado
    });
  }
  */

  public userLogin(): void {
    const val = this.validatePayload()

    if (!val) {
      this.authService.userLoginAuth(this.payload);
    } else {
      this.sweetUIService.alertConfirm('Atención', val, 'warning');
    }
  }




  private validatePayload(): string {
    let validations = '';
    if (!this.payload.email) {
      validations = '<p> - Debe ingresar un emails </p>';
    }
    if (!this.payload.password) {
      if (!validations) {
        validations = '<p> - Debe ingresar una contraseña </p>';
      } else {
        validations = validations + '<p> - Debe ingresar una contraseña </p>';
      }
    }

    return validations;
  }






}
