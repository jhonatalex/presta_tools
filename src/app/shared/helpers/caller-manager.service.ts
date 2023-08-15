import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { CallerService } from './caller.service';

@Injectable({
  providedIn: 'root',
})
export class CallerManagerService {
  constructor(
    /**
     * Servicio de LLamados
     */
    private callerSV: CallerService
  ) {}

  /**
   * Recurso que retorna una promesa con la respuesta del GET
   * @param serviceUrl URL del Servicio
   */
  public getData(serviceUrl: string): Promise<any> {
    return firstValueFrom(this.callerSV.get(serviceUrl));
  }


  public getDataById(serviceUrl: string,id:number): Promise<any> {
    return firstValueFrom(this.callerSV.getByID(serviceUrl,id));
  }



  public getFile(serviceUrl: string): Promise<any> {
    return firstValueFrom(this.callerSV.getFile(serviceUrl));
  }
  /**
   * Recurso que retorna una promesa con la respuesta del PUT
   * @param serviceUrl URL del Servicio
   * @param object Objeto a grabar
   */
  public putData(serviceUrl: string, object: any): Promise<any> {
    return firstValueFrom(this.callerSV.put(serviceUrl, object));
  }
  /**
   * Recurso que retorna una promesa con la respuesta del POST
   * @param serviceUrl URL del Servicio
   * @param object Objeto a grabar
   */
  public postData(serviceUrl: string, object: any): Promise<any> {
    return firstValueFrom(this.callerSV.post(serviceUrl, object));
  }
  /**
   * Recurso que retorna un Archivo
   * @param serviceUrl URL del Servicio
   * @param object Objeto a grabar
   */
  public postDataResFile(serviceUrl: string, object: any): Promise<any> {
    return firstValueFrom(this.callerSV.postGetFile(serviceUrl, object));
  }
  /**
   * Recurso que retorna una promesa con la respuesta del DELETE
   * @param serviceUrl URL del Servicio
   */
  public deleteData(serviceUrl: string,id:number): Promise<any> {
    return firstValueFrom(this.callerSV.deleteByid(serviceUrl,id));
  }
}
