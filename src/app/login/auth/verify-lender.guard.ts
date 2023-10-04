import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/register/models/user.model';
import { Constants } from 'src/app/shared/constants/settings.class';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VerifyLenderGuard  {
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

      if(user.verify && user.typeUser == 'lender' || user.typeUser == 'Manager'){
        return true
      }else{

        this.sweetUIService
        .alertConfirm("Hola", "Para entrar aquí, Necesitas estar verificado y ser un PrestaTools", 'warning')
        .then(() => {
          this.utilService.navigateToPath('/verificar-lender');
        })
        .catch(console.warn);

        return false

      }

  }

}
