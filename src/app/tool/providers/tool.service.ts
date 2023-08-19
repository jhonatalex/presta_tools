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
import { Tool, ToolResponse } from '../models/tool.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, finalize, from, map, of, tap } from 'rxjs';

//import { RegisterRS } from '../models/registerRS.model';

@Injectable({
  providedIn: 'root'
})
export class ToolServiceNew {

  constructor(private callManSV: CallerManagerService,
              private spinner: NgxSpinnerService,
              private sweetUIService:SweetUIService,
             private storage: AngularFireStorage,
              private utilService: UtilService) { }


  public saveTool(payload: any):void{

    this.spinner.show();


    const url = `${environment.baseUrl}${PathTool.saveTool}`;
    this.callManSV.postData(url, payload)
    .then((response:any)=>{
     // console.log(response);
      this.manageResponse(response);
    })
    .catch((error:any)=>{
      this.manageError(error);
    })
    .finally(()=>this.spinner.hide())

  }



  public getListTool(): Observable<ToolResponse[]> {
    this.spinner.show();

    const url = `${environment.baseUrl}${PathTool.getListTool}`;
    return from(this.callManSV.getData(url)).pipe(
      map((response: ResponseApi) => {
      //  console.log(response);
        return response.data as unknown as ToolResponse[]; // Asegúrate de que response.data sea del tipo Tool[]
      }),
      catchError((error: any) => {
        this.manageError(error);
        return of([] as ToolResponse[]); // Devuelve un arreglo vacío con el tipo Tool[] si hay un error.
      }),
      finalize(() => this.spinner.hide())
    );
  }




  getDetailToolProviders(id:number):Observable<ToolResponse>{

    this.spinner.show();
    const url = `${environment.baseUrl}${PathTool.getToolId}`;

   // console.log(url+id)

    return from(this.callManSV.getDataById(url,id)).pipe(
      map((response: ResponseApi<ToolResponse>) => response.data),
      tap((tool: ToolResponse) => {
      //  console.log(tool);
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


  async uploadFile(selectedFile: File): Promise<string> {


    if (selectedFile) {
      const filePath = `imagenes/tool/${selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, selectedFile);

      // ACTIVA EL LOADER
      this.spinner.show();

      try {
        // Esperar a que se complete la carga del archivo
        const snapshot = await task.snapshotChanges().toPromise();

        if (snapshot?.state === 'success') {
          // La carga se completó con éxito

          // DESACTIVA EL LOADER
          this.spinner.hide();

          // Obtener la URL de descarga
          const url = await fileRef.getDownloadURL().toPromise();
       //   console.log('URL de descarga:', url);
          return url;
        } else {
          // Ocurrió un error durante la carga
          throw new Error('La carga del archivo falló');
        }

      } catch (error) {
        // Ocurrió un error durante la carga
     //   console.log('Error al cargar el archivo', error);
        this.spinner.hide();
        this.sweetUIService.alertConfirm('Alerta','La carga del archivo falló','error')

        throw error;
      }
    }

    return '';
  }






  private manageResponse(responseApi:ResponseApi){

    if(responseApi.success){
      this.sweetUIService.alertConfirm('¡Hola!',responseApi.message,'success')
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
