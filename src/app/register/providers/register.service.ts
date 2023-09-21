import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PathUser } from 'src/app/shared/constants/endpoints.class';
import { CallerManagerService } from 'src/app/shared/helpers/caller-manager.service';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { CallerService } from '../../shared/helpers/caller.service';
import { RegisterRS } from '../models/registerRS.model';
import { Observable, catchError, finalize, from, map, tap } from 'rxjs';

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


  /*
  public update(payload: any):void{
    this.spinner.show();
    const url = `${environment.baseUrl}${PathUser.updateUser}`;
    this.callManSV.putData(url, payload)
    .then((response:any)=>{
      this.manageResponseUpdate(response);
    })
    .catch((error:any)=>{
      this.manageError(error);
    })
    .finally(()=>this.spinner.hide())
  }

  /

  private manageResponseUpdate(registerRS:RegisterRS){
    if(registerRS.success){
      this.sweetUIService.alertConfirm('Usuario Verificado y Actualizado',registerRS.message,'success')
      .then(()=>{
        //this.utilService.navigateToPath('/acceso')
      })
      .catch((e:any)=>{console.log(e);})
    }else{
      this.sweetUIService.alertConfirm('Alerta',registerRS.message ,'error')
      console.log(registerRS.Error?.message)
       this.utilService.navigateToPath('/')
    }
  }
*/
    update(payload: any):Observable<RegisterRS>{

    this.spinner.show();
    const url = `${environment.baseUrl}${PathUser.updateUser}`;

    return from(this.callManSV.putData(url, payload)).pipe(
      map((response: RegisterRS) => {
        return response.data as unknown as RegisterRS; // Asegúrate de que response.data sea del tipo Tool[]

      }),
      catchError((error: any) => {
        this.manageError(error);
        throw error;
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );


  }











  private manageResponse(registerRS:RegisterRS){
    if(registerRS.success){
      this.sweetUIService.alertConfirm('Bienvenido',registerRS.message,'success')
      .then(()=>{
        this.utilService.navigateToPath('/acceso')
      })
      .catch((e:any)=>{console.log(e);})
    }else{
      this.sweetUIService.alertConfirm('Alerta',registerRS.message ,'error')
      console.log(registerRS.Error?.message)
    }
  }



  private manageError(e: any) {
    let errDesc = e['error']['Error']['message'];
    const tmpErrMsg = e.message ? e.message : JSON.stringify(e);
    errDesc = errDesc ? errDesc : tmpErrMsg;
    this.sweetUIService.alertConfirm('Error', `${errDesc}`, 'error');
  }




}
