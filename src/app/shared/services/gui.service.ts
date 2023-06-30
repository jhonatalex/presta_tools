import { Injectable } from '@angular/core';
import swal2, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetUIService {

  constructor() { }

  public alertCancelConfirm(
    title: string,
    /**
     * it could be an HTML or an String
     */
    message: string,
    icon?: 'success' | 'error' | 'warning' | 'info' | 'question',
    confirmTxt?: string,
    cancelTxt?: string
  ): Promise<SweetAlertResult<any>> {
    return swal2
      .fire({
        icon: icon ? icon : undefined,
        title: title ? title : 'Atención',
        showCancelButton: true,
        confirmButtonText: confirmTxt ? confirmTxt : 'Aceptar',
        cancelButtonText: cancelTxt ? cancelTxt : 'Volver',
        customClass: {
          confirmButton: 'button-primary font-l',
          cancelButton: 'button-secondary font-l',
          title: 'font-xl',
          htmlContainer: 'font-l',
          icon: 'font-l',
          popup: 'swal2-custom-popup'
        },
        reverseButtons: true,
        willOpen: (dom: any) => { },
        html: message,
        // width: 600,
      });
  }

  public alertConfirm(
    title: string,
    /**
     * it could be an HTML or an String
     */
    message: string,
    icon?: 'success' | 'error' | 'warning' | 'info' | 'question' | null,
    confirmTxt?: string,
  ): Promise<SweetAlertResult<any>> {
    return swal2
      .fire({
        icon: icon ? icon : undefined,
        title: title ? title : 'Atención',
        showCancelButton: false,
        confirmButtonText: confirmTxt ? confirmTxt : 'Aceptar',
        customClass: {
          confirmButton: 'button-primary font-l',
          title: 'font-xl',
          htmlContainer: 'font-l',
          icon: 'font-l',
          popup: 'swal2-custom-popup'
        },
        reverseButtons: true,
        willOpen: (dom: any) => {},
        html: message,
        // width: 600,
      });
  }
}
