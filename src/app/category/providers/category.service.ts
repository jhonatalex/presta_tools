import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PathCategory, PathUser } from 'src/app/shared/constants/endpoints.class';
import { CallerManagerService } from 'src/app/shared/helpers/caller-manager.service';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { CallerService } from '../../shared/helpers/caller.service';
import { CategoryRS } from '../models/categoryRS.model';
import { ListCategoryComponent } from '../components/list-category/list-category.component';
import { Observable, catchError, finalize, from, map, tap } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService{

  constructor(private callManSV: CallerManagerService,
              private spinner: NgxSpinnerService,
              private sweetUIService:SweetUIService,
              private utilService: UtilService) { }


public getListCategoryProviders(): Observable<Category[]> {
  this.spinner.show();
  const url = `${environment.baseUrl}${PathCategory.getListUser}`;

  return from(this.callManSV.getData(url)).pipe(
    map((response: any) => response.response), // Extraer la lista de categorías del objeto de respuesta
    tap((categories: Category[]) => {
      console.log(categories);
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


  private manageError(e: any) {
    let errDesc = e['error']['Error']['message'];
    const tmpErrMsg = e.message ? e.message : JSON.stringify(e);
    errDesc = errDesc ? errDesc : tmpErrMsg;
    this.sweetUIService.alertConfirm('Error', `${errDesc}`, 'error');
  }

}
