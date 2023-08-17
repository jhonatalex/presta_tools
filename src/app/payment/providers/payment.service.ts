import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PathTool, PathUser } from 'src/app/shared/constants/endpoints.class';
import { CallerManagerService } from 'src/app/shared/helpers/caller-manager.service';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { CallerService } from '../../shared/helpers/caller.service';
import { ResponseApi } from 'src/app/shared/models/responseApi.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, finalize, from, map, of, tap } from 'rxjs';
import { PayData } from '../models/payData.models';
import { PayResponse } from '../models/payResponse.models';

//import { RegisterRS } from '../models/registerRS.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentServices {

  constructor(private callManSV: CallerManagerService,
              private spinner: NgxSpinnerService,
              private sweetUIService:SweetUIService,
              private storage: AngularFireStorage,
              private utilService: UtilService) { }





  public initTransaction(payData:PayData): Observable<PayResponse> {
    this.spinner.show();

    const url = `${environment.baseUrl}${PathTool.initPay}`;
    return from(this.callManSV.postData(url,payData)).pipe(
      map((response: ResponseApi) => {
        console.log(response);
        return response.data as unknown as PayResponse; // Asegúrate de que response.data sea del tipo Tool[]
      }),
      catchError((error: any) => {
        this.manageError(error);
        throw error;
      }),
      finalize(() => this.spinner.hide())
    );
  }



  private manageResponse(responseApi:ResponseApi){

    if(responseApi.success){
      this.sweetUIService.alertConfirm('Mensaje',responseApi.message,'success')
      .then(()=>{

        this.utilService.navigateToPath('/')

      })
      .catch((e:any)=>{console.log(e);})
    }else{
      this.sweetUIService.alertConfirm('Alerta',responseApi.message ,'error')
      console.log(responseApi.Error?.message)
    }
  }


  private manageError(e: any) {
    let errDesc = e['error']['Error']['message'];
    const tmpErrMsg = e.message ? e.message : JSON.stringify(e);
    errDesc = errDesc ? errDesc : tmpErrMsg;
    this.sweetUIService.alertConfirm('Error', `${errDesc}`, 'error');
  }





}
