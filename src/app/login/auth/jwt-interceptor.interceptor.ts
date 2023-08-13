import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants } from 'src/app/shared/constants/settings.class';
import { SweetUIService } from 'src/app/shared/services/gui.service';

import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private tokenKEY = `${new Constants().getStorageKeys().decodedTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  constructor(private utilService: UtilService,   private sweetUIService: SweetUIService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const token: string =   this.utilService.getFromLocalStorage(this.tokenKEY);

    let req = request;
    if (token) {
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          const e = err.message ? err.message : JSON.stringify(err);
          this.sweetUIService.alertConfirm('Error', e);
        }
        if (err.status === 401) {
          this.utilService.navigateToPath('/acceso');
        }
        return throwError(err);
      })
    );
  }
}
