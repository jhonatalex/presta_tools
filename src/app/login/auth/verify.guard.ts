import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constants/settings.class';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { User } from 'src/app/register/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class VerifyGuard  {

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  constructor( private authService:AuthService,
                private utilService: UtilService,
                private sweetUIService:SweetUIService,
         ){

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      var user: User = this.utilService.getFromLocalStorage(this.loginKey);

      if(user.verify){
        return true
      }else{

        this.sweetUIService
        .alertConfirm("Hola", "Para Reservar; Necesitas ser un usuario verificado", 'warning')
        .then(() => {
          this.utilService.navigateToPath('/verificar-usuario');
        })
        .catch(console.warn);

        return false

      }

  }






}
