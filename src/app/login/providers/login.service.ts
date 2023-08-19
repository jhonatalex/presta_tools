import { Injectable } from '@angular/core';
import { loginEndpoint } from 'src/app/shared/constants/endpoints.class';
import { CallerManagerService } from 'src/app/shared/helpers/caller-manager.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private callManSV: CallerManagerService) { }


  public authenticate(payload: any): Promise<Object | undefined> {
    const url = `${environment.baseUrl}${loginEndpoint.loginAuthenticate}`;
    return this.callManSV.postData(url, payload);
  }
}
