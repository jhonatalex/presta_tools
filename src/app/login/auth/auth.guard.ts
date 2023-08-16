import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constants/settings.class';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { SweetUIService } from 'src/app/shared/services/gui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  constructor( private authService:AuthService,
                private utilService: UtilService,
         ){

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.utilService.getFromLocalStorage(this.loginKey+'D3V')){
        return true
      }else{


        this.utilService.navigateToPath('/acceso').finally(() => {
          this.authService.endSession(
            '¡Hola! Para acceder aquí, debes  ingresar a tu cuenta o crear una',
            'Atención'
          );
        });
        return false;
      }

  }






}
