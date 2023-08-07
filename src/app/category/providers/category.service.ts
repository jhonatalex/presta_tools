import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PathCategory, PathTool, PathUser } from 'src/app/shared/constants/endpoints.class';
import { CallerManagerService } from 'src/app/shared/helpers/caller-manager.service';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { CallerService } from '../../shared/helpers/caller.service';
import { CategoryRS } from '../models/categoryRS.model';
import { ListCategoryComponent } from '../components/list-category/list-category.component';
import { Observable, catchError, finalize, from, map, tap } from 'rxjs';
import { Category, CategoryApi } from '../models/category.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ResponseApi } from 'src/app/shared/models/responseApi.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService{

  constructor(private callManSV: CallerManagerService,
              private spinner: NgxSpinnerService,
              private sweetUIService:SweetUIService,
              private storage: AngularFireStorage,
              private utilService: UtilService) { }


public getListCategoryProviders(): Observable<Category[]> {
  this.spinner.show();
  const url = `${environment.baseUrl}${PathCategory.getListCategory}`;

  return from(this.callManSV.getData(url)).pipe(
    map((response: any) => response.data),
    tap((categories: Category[]) => {
      //console.log(categories);
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

  public saveCategory(payload: any):void{

    this.spinner.show();

    const url = `${environment.baseUrl}${PathCategory.saveCategory}`;
    this.callManSV.postData(url, payload)


    .then((response:any)=>{
      console.log(response);
      this.manageResponse(response);
    })
    .catch((error:any)=>{
      this.manageError(error);
    })
    .finally(()=>this.spinner.hide())

  }

  public updateCategory(payload: any):void{

    this.spinner.show();

    const url = `${environment.baseUrl}${PathCategory.updCategory}`;
    console.log(url)
    this.callManSV.putData(url, payload)

    .then((response:any)=>{
      console.log(response);
      this.manageResponse(response);
    })
    .catch((error:any)=>{
      this.manageError(error);
    })
    .finally(()=>this.spinner.hide())

  }

  getDetailCategoryProviders(id:number):Observable<Category>{

    this.spinner.show();
    const url = `${environment.baseUrl}${PathCategory.getCategoryId}`;
    console.log(url+id)

    return from(this.callManSV.getDataById(url,id)).pipe(
      map((response: any) => response.data),
      tap((Category: Category) => {
        console.log(Category);
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



  public deleteCategory(id: any):void{

    this.sweetUIService
          .alertCancelConfirm(
            'Atención',
            'Seguro desea Borrar esta Categoria',
            'question',
            'Aceptar',
            'Cancelar'
          )
          .then((r) => {
            if (r.value) {

                this.spinner.show();
                const url = `${environment.baseUrl}${PathCategory.deleteCategoryId}`;
                this.callManSV.deleteData(url, id)

                .then((response:any)=>{
                  console.log(response);

                  this.manageResponse(response);
                  this.getListCategoryProviders();

                })
                .catch((error:any)=>{
                  this.manageError(error);
                })
                .finally(()=>this.spinner.hide())
            }
          });

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
          console.log('URL de descarga:', url);
          return url;
        } else {
          // Ocurrió un error durante la carga
          throw new Error('La carga del archivo falló');
        }

      } catch (error) {
        // Ocurrió un error durante la carga
        console.log('Error al cargar el archivo', error);
        this.spinner.hide();
        this.sweetUIService.alertConfirm('Alerta','La carga del archivo falló','error')

        throw error;
      }
    }

    return '';
  }





  private manageResponse(responseApi:ResponseApi){

    if(responseApi.success){
      this.sweetUIService.alertConfirm('Mensaje',responseApi.message,'success')
      .then(()=>{

        this.utilService.navigateToPath('/listar-categoria')
        

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
