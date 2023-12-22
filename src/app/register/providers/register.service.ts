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
      console.log(error)
      this.manageError(error);
    })
    .finally(()=>this.spinner.hide())
  }



  public getUserByEmail(email:string):Observable<any>{

    this.spinner.show();
    const url = `${environment.baseUrl}${PathUser.getUserById}`;

    return from(this.callManSV.getDataByEmail(url,email)).pipe(
      map((response: any) => response.message),
      tap(() => {

      }),
      catchError((error: any) => {
        console.log(error)
        this.manageError(error);
        throw error;
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );

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
   public update(payload: any):Observable<any>{

    this.spinner.show();
    console.log(payload);
    const url = `${environment.baseUrl}${PathUser.updateUser}`;

    return from(this.callManSV.putData(url, payload)).pipe(
      map((response: any) => response.message),
      tap(() => {

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
    if (e.error && e.error.errors) {
      const errorMessages = [];
      for (const key in e.error.errors) {
        if (e.error.errors.hasOwnProperty(key)) {
          errorMessages.push(e.error.errors[key]);
        }
      }
      const errorMessage = errorMessages.join('\n');
      this.sweetUIService.alertConfirm('Error', errorMessage, 'error');
    } else {
      let errDesc = e.message ? e.message : JSON.stringify(e);
      this.sweetUIService.alertConfirm('Error', errDesc, 'error');
    }
  }



}
