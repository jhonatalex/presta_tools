import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, from, map, Observable, tap } from 'rxjs';
import { PathLender} from 'src/app/shared/constants/endpoints.class';
import { CallerManagerService } from 'src/app/shared/helpers/caller-manager.service';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { Lender } from '../models/lender.model';
import { LenderRS } from '../models/registerLenderRS.model';
import { Constants } from 'src/app/shared/constants/settings.class';



@Injectable({
  providedIn: 'root'
})
export class LenderService {

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  constructor(private callManSV: CallerManagerService,
              private spinner: NgxSpinnerService,
              private sweetUIService:SweetUIService,
              private utilService: UtilService) { }



  public getLenderByEmail(email:string):Observable<any>{

    this.spinner.show();
    const url = `${environment.baseUrl}${PathLender.getLenderById}`;


    return from(this.callManSV.getDataByEmail(url,email)).pipe(
      map((response: any) => response.data),
      tap((lender: Lender) => {

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





  public register(payload: any):void{
    this.spinner.show();
    const url = `${environment.baseUrl}${PathLender.saveLender}`;
    this.callManSV.postData(url, payload)
    .then((response:any)=>{
      this.manageResponse(response);
    })
    .catch((error:any)=>{
      this.manageError(error);
    })
    .finally(()=>this.spinner.hide())
  }

  private manageResponse(lenderRS:LenderRS){
    if(lenderRS.success){

      this.sweetUIService.alertConfirm('PrestaTools Verificado',lenderRS.message,'success')
      .then(()=>{
          //REDIRECCION ENVIAR A LA URL de DONDE VINO
        this.utilService.navigateToPath('/agregar-producto')
      })
      .catch((e:any)=>{console.log(e);})
    }else{
      this.sweetUIService.alertConfirm('Alerta',lenderRS.message ,'error')
      console.log(lenderRS)
      this.utilService.navigateToPath('/verificar-lender')
    }
  }

  private manageError(e: any) {
    let errDesc = e['error']['Error']['message'];
    const tmpErrMsg = e.message ? e.message : JSON.stringify(e);
    errDesc = errDesc ? errDesc : tmpErrMsg;
    this.sweetUIService.alertConfirm('Error', `${errDesc}`, 'error');
  }




}
