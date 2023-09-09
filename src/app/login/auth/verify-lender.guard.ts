import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/register/models/user.model';
import { Constants } from 'src/app/shared/constants/settings.class';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VerifyLenderGuard implements CanActivate {
  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  constructor( 
    private utilService: UtilService,
    private sweetUIService:SweetUIService,
  ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var user: User = this.utilService.getFromLocalStorage(this.loginKey);

      if(user.verify && user.typeUser == 'lender'){
        return true
      }else{

        this.sweetUIService
        .alertConfirm("Hola", "Para Alquilar Necesitas estar verificado", 'warning')
        .then(() => {
          this.utilService.navigateToPath('/verificar-lender');
        })
        .catch(console.warn);

        return false

      }
    
  }
  
}
