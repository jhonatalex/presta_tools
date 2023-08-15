import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { User } from 'src/app/register/models/user.model';
import { Constants } from 'src/app/shared/constants/settings.class';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';
import { SweetUIService } from 'src/app/shared/services/gui.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  constructor( private authService:AuthService,
                private utilService: UtilService,
                private sweetUIService: SweetUIService,
              ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRoles = route.data?.['allowedRoles'];

    const user = this.utilService.getFromLocalStorage(this.loginKey+'D3V');

     if(user && allowedRoles.includes(user.typeUser)){
      return true
    }else{
      this.sweetUIService
      .alertConfirm("Alerta", "No tiene permisos suficientes para entrar", 'warning')
      .then(() => {
        this.utilService.navigateToPath('');
      })
      .catch(console.warn);

      return false
    }

  }





}
