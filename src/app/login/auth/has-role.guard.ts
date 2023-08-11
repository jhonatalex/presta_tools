import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Constants } from 'src/app/shared/constants/settings.class';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/app/register/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanLoad {

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;


  constructor(private authService: AuthService,
    private utilService: UtilService){}




  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allwedRoles = route.data?.['allwedRoles'];

      console.log(this.utilService.getFromLocalStorage(this.loginKey+'D3V').pipe(
        map((user: User )=> Boolean(user && allwedRoles.includes(user.typeUser)) )
      ))


      return this.utilService.getFromLocalStorage(this.loginKey+'D3V').pipe(
        map((user: User )=> Boolean(user && allwedRoles.includes(user.typeUser)) )
      )





  }
}
