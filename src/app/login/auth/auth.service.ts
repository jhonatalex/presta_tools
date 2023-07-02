import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { environment } from 'src/environments/environment';

import { Constants } from '../../shared/constants/settings.class';
import { UtilService } from '../../shared/services/util.service';
//import { decodedTkn } from '../interfaces/jwt.interface';
import { loginResponse } from '../models/login.model';
import { LoginService } from '../providers/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


 /*
  private tokenSelCntrsKey = `${new Constants().getStorageKeys().selCntrs}${
    environment.production ? '' : 'D3V'
  }`;*/


  constructor(
    /**
     * Servicio de Proveedor de Data de Login
     */
    private loginService: LoginService,
    /**
     * Servicio de Alertas Graficas.
     */
    private sweetUIService: SweetUIService,
    /**
     * Servicio de Utilidades
     */
    private utSV: UtilService,
    /**
     * Loading Spinner
     */
    private spinner: NgxSpinnerService
  ) {}

  public userLoginAuth(payload: any): void {
    this.spinner.show();
    this.loginService
      .authenticate(payload)
      .then((res: any) => {
        this.manageAuthResponse(res);
      })
      .catch((e) => {
        this.manageError(e);
      })
      .finally(() => this.spinner.hide());
  }

  /**
   * Metodo de manejo de la respuesta del Auth.
   * @param authResponse Respuesta del Login
   */
  private manageAuthResponse(loginData: loginResponse) {
    const tokenString = loginData.token;
      //const jwtHelper = new JwtHelperService();
      //const decodedToken: decodedTkn = jwtHelper.decodeToken(tokenString);
      // const expirationDate = jwtHelper.getTokenExpirationDate(tokenString);
      //const isExpired = jwtHelper.isTokenExpired(tokenString);
      // SET USER A LOCAL SOTORAGE
      //this.utSV.setToSessionStorage(this.tokenUsrCntrsKey, loginData.centros);



      console.log(loginData);

     // if(loginData.success){

        if (loginData!=null) {

          // Navegar al HOME
          this.utSV.navigateToPath('/');


        } else {
          this.endSession(
            'El usuario no tiene permisos suficientes para utilizar esta aplicacion Web',
            'Atención'
          );
        }
     // }




 }

 /*
  /**
   * Cierra la sesion del usuario actual
   */
  public logout(): void {
    /*
    this.utSV.removeFromCookies(this.tokenKEY);
    this.utSV.removeFromLocalStorage(this.tokenDataKEY);
    this.utSV.removeFromLocalStorage(this.tokenPermKEY);
    this.utSV.removeFromSessionStorage(this.tokenUsrCntrsKey);
    this.utSV.removeFromSessionStorage(this.tokenSelCntrsKey);
    */
  }

  /**
   * Finaliza la sesion del usuario actual,
   * ( Redirecciona al Login )
   */

  public endSession(
    message: string = 'Su sesion se ha cerrado',
    title: string = 'Atención'
  ) {
    this.logout();
    this.sweetUIService
      .alertConfirm(title, message, 'warning')
      .then(() => {
        this.utSV.navigateToPath('/acceso');
      })
      .catch(console.warn);
  }








  private manageError(e: any) {
    let errDesc = e['error']['Error']['message'];
    const tmpErrMsg = e.message ? e.message : JSON.stringify(e);
    errDesc = errDesc ? errDesc : tmpErrMsg;
    this.sweetUIService.alertConfirm('Error', `${errDesc}`, 'error');
  }
}
