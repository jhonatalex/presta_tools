import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private globalData: any;
  constructor(private router: Router, /*private cookieService: CookieService*/) {
    this.globalData = null;
  }

  /**
   * Navega a una Ruta Especifica dentro del proyecto
   * @param path Ruta a la cual se desea Navegar
   */
  public navigateToPath(path: string): Promise<boolean> {
    if (path === '') {
      //path = '/404';
    }
    return this.router.navigate([path]);
  }
  /**
   * Guarda un Objeto con una LLave de Identificacion en LocalStorage
   * @param key llave identificadora del objeto a guardar
   * @param data objeto a guardar
   *
   * Cabe destacar que la informacion almacenada en LocalStorage
   * ES persistente hasta que se borre el cache del explorador,
   * es decir, PERMANECE al cerrar el explorador. ~5MB
   */
  public setToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Obtiene un Objeto con una LLave de Identificacion desde LocalStorage
   * @param key llave identificadora del objeto a recuperar
   *
   * Cabe destacar que la informacion almacenada en LocalStorage
   * ES persistente hasta que se borre el cache del explorador,
   * es decir, PERMANECE al cerrar el explorador. ~5MB
   */
  public getFromLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    const value = JSON.parse(item);

    return value || null;
  }

  /**
   * Elimina un Objeto con una LLave de Identificacion en el LocalStorage
   * @param key llave identificadora del objeto a Eliminar
   *
   * Cabe destacar que la informacion almacenada en LocalStorage
   * ES persistente hasta que se borre el cache del explorador,
   * es decir, PERMANECE al cerrar el explorador. ~5MB
   */
  public removeFromLocalStorage(key: string): void {
    const value = localStorage.getItem(key);
    if (value) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Guarda un Objeto con una LLave de Identificacion en SessionStorage
   * @param key llave identificadora del objeto a guardar
   * @param data objeto a guardar
   *
   * Cabe destacar que la informacion almacenada en SessionStorage
   * NO es persistente al cerrar la pestaña del explorador,
   * es decir, se Elimina al cerrar la pestaña en uso. ~5MB
   */
  public setToSessionStorage(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Obtiene un Objeto con una LLave de Identificacion desde SessionStorage
   * @param key llave identificadora del objeto a recuperar
   *
   * Cabe destacar que la informacion almacenada en SessionStorage
   * NO es persistente al cerrar la pestaña del explorador,
   * es decir, se Elimina al cerrar la pestaña en uso. ~5MB
   */
  public getFromSessionStorage(key: string): any {
    const item = sessionStorage.getItem(key);
    if (!item) {
      return null;
    }
    const value = JSON.parse(item);
    return value || null;
  }

  /**
   * Elimina un Objeto con una LLave de Identificacion en el SessionStorage
   * @param key llave identificadora del objeto a Eliminar
   *
   * Cabe destacar que la informacion almacenada en SessionStorage
   * NO es persistente al cerrar la pestaña del explorador,
   * es decir, se Elimina al cerrar la pestaña en uso. ~5MB
   */
  public removeFromSessionStorage(key: string): void {
    const value = sessionStorage.getItem(key);
    if (value) {
      sessionStorage.removeItem(key);
    }
  }

  /**
   * Guarda un Objeto con una LLave de Identificacion en las Cookies
   * @param key      llave identificadora del objeto a Guardar
   * @param data     objeto a guardar
   * @param expires  Numero de dias hasta que la Cookie expire, o en su defecto una Fecha
   * @param path     Ruta o path de la Cookie
   * @param domain   Dominio de la Cookie
   * @param secure   Indicador booleano de sguridad (es seguro ?)
   * @param sameSite OWASP samesite token `Lax`, `None`, or `Strict`. Defaults to `Lax`
   *
   * ~4Kb
   */



  // setToCookies(
  //   key: string,
  //   data: any,
  //   expires?: number | Date,
  //   path?: string,
  //   domain?: string,
  //   secure?: boolean,
  //   sameSite?: 'Lax' | 'None' | 'Strict'
  // ): void {
  //   this.cookieService.set(
  //     key,
  //     data,
  //     expires ? expires : undefined,
  //     path ? path : undefined,
  //     domain ? domain : undefined,
  //     secure ? secure : undefined,
  //     sameSite ? sameSite : undefined
  //   );
  // }
  // /**
  //  * Obtiene un Objeto con una LLave de Identificacion desde las Cookies
  //  * @param key llave identificadora del objeto a Recuperar
  //  *
  //  * ~4Kb
  //  */
  // getFromCookies(key: string): string {
  //   return this.cookieService.get(key);
  // }
  // /**
  //  * Revisa la existencia de la Cokkie con una LLave de Identificacion (Booleano)
  //  * @param key llave identificadora del objeto a Recuperar
  //  *
  //  * ~4Kb
  //  */
  // checkFromCookies(key: string): boolean {
  //   return this.cookieService.check(key);
  // }
  // /**
  //  * Elimina un Objeto con una LLave de Identificacion en el SessionStorage
  //  * @param key      llave identificadora del objeto a Eliminar
  //  * @param path     Ruta o path de la Cookie
  //  * @param domain   Dominio de la Cookie
  //  * @param secure   Indicador booleano de sguridad (es seguro ?)
  //  * @param sameSite OWASP samesite token `Lax`, `None`, or `Strict`. Defaults to `Lax`
  //  *
  //  * ~4Kb
  //  */
  // removeFromCookies(
  //   key: string,
  //   path?: string,
  //   domain?: string,
  //   secure?: boolean,
  //   sameSite?: 'Lax' | 'None' | 'Strict'
  // ): void {
  //   this.cookieService.delete(
  //     key,
  //     path ? path : undefined,
  //     domain ? domain : undefined,
  //     secure ? secure : undefined,
  //     sameSite ? sameSite : undefined
  //   );
  // }

  // public getGlobalData() {
  //   return this.globalData;
  // }

  // public setGlobalData(value: any) {
  //   this.globalData = value;
  // }

  public dateComparator(date1: any, date2: any): number {
    let yearNumber = '';
    let monthNumber = '';
    let dayNumber = '';
    yearNumber = date1.substring(6, 10);
    monthNumber = date1.substring(3, 5);
    dayNumber = date1.substring(0, 2);
    let date1Number =
      Number(yearNumber) * 10000 +
      Number(monthNumber) * 100 +
      Number(dayNumber);
    yearNumber = date2.substring(6, 10);
    monthNumber = date2.substring(3, 5);
    dayNumber = date2.substring(0, 2);
    let date2Number =
      Number(yearNumber) * 10000 +
      Number(monthNumber) * 100 +
      Number(dayNumber);
    if (date1Number === null && date2Number === null) {
      return 0;
    }
    if (date1Number === null) {
      return -1;
    }
    if (date2Number === null) {
      return 1;
    }
    return date1Number - date2Number;
  }




}
