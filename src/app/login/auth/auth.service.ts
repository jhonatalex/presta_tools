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
import { RegisterRS } from 'src/app/register/models/registerRS.model';


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
  private lenderKey = `${new Constants().getStorageKeys().lenderSetKey}${
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
        .then( (res: any) => {

          const userFirebase = res.user;

            const inputString = userFirebase.displayName;
            const palabras = inputString.split(' ');

            let nombre: string;
            let apellido: string;

            if (palabras.length >= 1) {
              nombre = palabras[0];

              if (palabras.length > 1) {
                // Si hay más de una palabra, el resto se considera el apellido
                apellido = palabras.slice(1).join(' ');
              } else {
                // Si solo hay una palabra, no hay apellido
                apellido = '';
              }
            } else {
              nombre = '';
              apellido = '';
            }

          this.user.id = this.generarIdUnicoNumerico();
          this.user.password=this.generarIdUnicoNumerico().toString();
          this.user.email= userFirebase.email;
          this.user.name= nombre;
          this.user.lastName= apellido;
          this.user.typeUser='user'


          //console.log(this.user);
          //console.log(userFirebase);


          //SET USER AND TOKEN A LOCAL SOTORAGE
          this.utilService.setToLocalStorage(this.loginKey, this.user);

          //REMPLAR POR EL JWT CUANDO SE VERIFIQUE
          this.utilService.setToLocalStorage(this.tokenKey,this.user.id);


          //TODO LOGIGA PARA SABER SE ES NUEVO O NO
           this.resgisterService.getUserByEmail(this.user.email).subscribe(response=>{

            if(response=='Usuario no encontrado'){
              this.resgisterService.register(this.user)
              this.utilService.navigateToPath('/');
            }else{
              this.manageAuthResponseFirebase(userFirebase);
            }

          });




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

 public generarIdUnicoNumerico(): number {
  const timestamp = new Date().getTime();
  const sixDigitId = parseInt(timestamp.toString().slice(-6));
  return sixDigitId;
}


 private manageAuthResponseFirebase(userFirebase: any) {

      //SET USER AND TOKEN A LOCAL SOTORAGE
        this.sweetUIService
        .alertConfirm("Bienvenido", 'Login Exitoso')
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
    this.utilService.removeFromLocalStorage(this.lenderKey);
  }


  public verifyLogged():boolean{

    var user = this.utilService.getFromLocalStorage(this.loginKey);

    return user? true : false;
  }


  /**
   * Finaliza la sesion del usuario actual,
   * ( Redirecciona al Login )
   */

  public endSession(message: string = 'Su sesión se ha cerrado', title: string = 'Atención'){
   
    this.logout();
    this.sweetUIService
      .alertConfirm(title, message, 'warning')
      .then(() => {
        this.utilService.navigateToPath('/acceso');
      })
      .catch(console.warn);
  }

  public endSession2(message: string = 'Su sesión se ha cerrado', title: string = 'Atención'){
    this.sweetUIService
    .alertCancelConfirm(
      'Atención',
      '¿Seguro que desea cerrar sesión?',
      'question',
      'Aceptar',
      'Cancelar'
    )
    .then((r) => {
          if (r.value) {
              this.spinner.show();
              this.logout()
              this.sweetUIService
                .alertConfirm(title, message, 'warning')
                .then(() => {
              this.utilService.navigateToPath('/acceso');
              })
              .catch(console.warn);
              this.spinner.hide();
          }
          
    });
    
  }





  private manageError(e: any) {
    let errDesc = e['error']['Error']['message'];
    const tmpErrMsg = e.message ? e.message : JSON.stringify(e);
    errDesc = errDesc ? errDesc : tmpErrMsg;
    this.sweetUIService.alertConfirm('Error', `${errDesc}`, 'error');
  }
}
