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
import { BehaviorSubject, catchError, finalize, from, map, of, tap } from 'rxjs';
import { PayData } from '../models/payData.models';
import { PayResponse } from '../models/payResponse.models';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

//import { RegisterRS } from '../models/registerRS.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentServices {


  miBehaviorSubject = new BehaviorSubject<ResponseApi|null>(null);
  miBehaviorSubjectUrl = new BehaviorSubject<string|null>(null);
  

  constructor(private callManSV: CallerManagerService,
              private spinner: NgxSpinnerService,
              private router: Router,
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



  public verifyTransaction(toke_ws:any): void {
    this.spinner.show();

    const url = `${environment.baseUrl}${PathTool.commitPay}`;

    this.callManSV.postData(url,toke_ws).then((response:any)=>{

      console.log(response)
       this.manageResponse(response);
     })
     .catch((error:any)=>{
       this.manageError(error);
     })
     .finally(()=>this.spinner.hide())

  }



  private manageResponse(responseApi: ResponseApi) {


    this.setData(responseApi);


    if (responseApi.success) {

          const navigationExtras: NavigationExtras = { state: { responseApi } // Pasamos el objeto responseApi como parte del estado de navegación

          };


          this.router.navigate(['/gracias'], navigationExtras )


    } else {

      const navigationExtras: NavigationExtras = {
        state: { responseApi } // Pasamos el objeto responseApi como parte del estado de navegación
      };

          this.router.navigate(['/transaccion-fallida'], navigationExtras)

      console.log(responseApi.Error?.message);
    }
  }


  private manageError(e: any) {
    let errDesc = e['error']['Error']['message'];
    const tmpErrMsg = e.message ? e.message : JSON.stringify(e);
    errDesc = errDesc ? errDesc : tmpErrMsg;
    this.sweetUIService.alertConfirm('Error', `${errDesc}`, 'error');
  }


  setData(data:any){
    this.miBehaviorSubject.next(data);

  }

  getData(){
    return  this.miBehaviorSubject.asObservable();
  }




  //para redirecion en verify-user
  setDataUrl(data:string){
    this.miBehaviorSubjectUrl.next(data);
    console.log(data)
  }
  getDataUrl(){
    return  this.miBehaviorSubjectUrl.asObservable();
  }
 


}
