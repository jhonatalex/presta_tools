import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PathUser } from 'src/app/shared/constants/endpoints.class';
import { CallerManagerService } from 'src/app/shared/helpers/caller-manager.service';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { CallerService } from '../../shared/helpers/caller.service';
import { RegisterRS } from '../models/registerRS.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private callManSV: CallerManagerService,
              private spinner: NgxSpinnerService,
              private sweetUIService:SweetUIService,
              private utilService: UtilService) { }


  public register(payload: any):void{
    this.spinner.show();
    const url = `${environment.baseUrl}${PathUser.saveUser}`;
    this.callManSV.postData(url, payload)
    .then((response:any)=>{
      this.manageResponse(response);
    })
    .catch((error:any)=>{
      this.manageError(error);
    })
    .finally(()=>this.spinner.hide())
  }

  private manageResponse(registerRS:RegisterRS){
    if(registerRS.success){
      this.sweetUIService.alertConfirm('Bienveido',registerRS.message,'success')
      .then(()=>{
        this.utilService.navigateToPath('/acceso')
      })
      .catch((e:any)=>{console.log(e);})
    }
  }

  private manageError(e: any) {
    let errDesc = e['error']['Error']['message'];
    const tmpErrMsg = e.message ? e.message : JSON.stringify(e);
    errDesc = errDesc ? errDesc : tmpErrMsg;
    this.sweetUIService.alertConfirm('Error', `${errDesc}`, 'error');
  }

}
