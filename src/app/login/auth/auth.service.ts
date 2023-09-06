import { Injectable } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { environment } from 'src/environments/environment';

import { Constants } from '../../shared/constants/settings.class';
import { UtilService } from '../../shared/services/util.service';

import { loginResponse } from '../models/login.model';
import { LoginService } from '../providers/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { decodedTkn } from '../interfaces/jwt.interface';
import { Auth, AuthCredential, UserCredential, signInWithCredential } from '@angular/fire/auth';
import { signInWithPopup,signOut,GoogleAuthProvider } from '@angular/fire/auth';
import { RegisterService } from 'src/app/register/providers/register.service';
import { User } from 'src/app/register/models/user.model';
import { use } from 'marked';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production? '' : 'D3V'
  }`;
  private tokenKey = `${new Constants().getStorageKeys().decodedTokenKey}${
    environment.production? '' : 'D3V'
  }`;

  public user = new User();;

  constructor(

    private auth: Auth,

    private resgisterService: RegisterService,
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
    private utilService: UtilService,
    /**
     * Loading Spinner
     */
    private spinner: NgxSpinnerService
  ) {}


    public sinInWithGoogle()
    {


      this.spinner.show();

      signInWithPopup(this.auth, new GoogleAuthProvider())
        .then((res: any) => {

          const userFirebase = res.user;

          this.user.email= userFirebase.email;
          this.user.id= userFirebase.uid;
          this.user.name= userFirebase.displayName;
          this.user.lastName= userFirebase.displayName;
          this.user.typeUser='user'

          console.log(this.user);
          console.log(userFirebase);
          userFirebase

          //TODO LOGIGA PARA SABER SE ES NUEVO O NO
          //this.resgisterService.register(this.user)
          this.manageAuthResponseFirebase(userFirebase);


        })
        .catch((e) => {
          this.manageError(e);
        })
        .finally(() => this.spinner.hide());


    }







  public userLoginAuth(payload: any): void {
    this.spinner.show();
    this.loginService
      .authenticate(payload)
      .then((res: any) => {
        //console.log(res);
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

      if(loginData.success){

      const tokenString = loginData.token;
      const jwtHelper = new JwtHelperService();
      //const decodedToken: decodedTkn = jwtHelper.decodeToken(tokenString);
      const expirationDate = jwtHelper.getTokenExpirationDate(tokenString);
      const isExpired = jwtHelper.isTokenExpired(tokenString);


        if(!isExpired){

              //SET USER AND TOKEN A LOCAL SOTORAGE
              this.utilService.setToLocalStorage(this.loginKey, loginData.data);
              this.utilService.setToLocalStorage(this.tokenKey,tokenString);
                this.sweetUIService
                .alertConfirm("Bienvenido", loginData.message, 'success')
                .then(() => {
                  this.utilService.navigateToPath('/');
                })
                .catch(console.warn);

                  // Navegar al HOME
                  //this.utSV.navigateToPath('/');

                } else {

                  this.endSession(loginData.message);
                  console.log(loginData.message)
                }


        }else{
          this.sweetUIService
          .alertConfirm("Atención", loginData.message, 'warning')
        }

 }

 private manageAuthResponseFirebase(loginData: any) {



      //SET USER AND TOKEN A LOCAL SOTORAGE
      this.utilService.setToLocalStorage(this.loginKey, loginData);
      this.utilService.setToLocalStorage(this.tokenKey,loginData.uid);
        this.sweetUIService
        .alertConfirm("Bienvenido", loginData.message, 'success')
        .then(() => {
          this.utilService.navigateToPath('/');
        })
        .catch(console.warn);



}


 /*
  /**
   * Cierra la sesion del usuario actual
   */
  public logout(): void {

    this.utilService.removeFromLocalStorage(this.loginKey);
    this.utilService.removeFromLocalStorage(this.tokenKey);
  }


  public verifyLogged():boolean{

    var user = this.utilService.getFromLocalStorage(this.loginKey);

    return user? true : false;
  }



  /**
   * Finaliza la sesion del usuario actual,
   * ( Redirecciona al Login )
   */

  public endSession(
    message: string = 'Su sesión se ha cerrado',
    title: string = 'Atención'
  ) {
    this.logout();
    this.sweetUIService
      .alertConfirm(title, message, 'warning')
      .then(() => {
        this.utilService.navigateToPath('/acceso');
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
