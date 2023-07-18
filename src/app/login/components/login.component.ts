import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { loginPayload } from '../models/login.model';
import { AuthService } from '../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ UtilService]
})



export class LoginComponent implements OnInit {


  private payload: loginPayload = new loginPayload();


  constructor(
        /**
     * Servicio de Utilidades
     */
        private utilService: UtilService,
      /**
     * Servicio de Proveedor de Data de Login

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
      private authService: AuthService,

    ) {}

  ngOnInit(): void {

    if(this.authService.verifyLogged()){

      this.utilService.navigateToPath('/')

    }

  }



  public setUserEmail(event: any): void {
    this.payload.email = event.target.value;
  }

  public setUserPassword(event: any): void {
    this.payload.password = event.target.value;
  }




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
