import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Constants } from '../constants/settings.class';

@Injectable({
  providedIn: 'root',
})
export class CallerService {
  private httpHeaders = new Constants().getHeadersOptions().headers;

  constructor(private http: HttpClient) {}

  /* --- GET --- */
  public get(url: string): Observable<Object | undefined> {
    this.httpHeaders['Access-Control-Allow-Methods'] = 'GET';
    this.httpHeaders['Content-Type'] = 'application/json';
    return this.http.get(url, {
      headers: new HttpHeaders(this.httpHeaders)
    });
  }

  /* --- GET  ID--- */
  public getByID(url: string,id:number): Observable<Object | undefined> {
    this.httpHeaders['Access-Control-Allow-Methods'] = 'GET';
    this.httpHeaders['Content-Type'] = 'application/json';
    return this.http.get(url+id, {
      headers: new HttpHeaders(this.httpHeaders)
    });
  }

  public getByEmail(url:string, email:string): Observable<Object | undefined> {
    this.httpHeaders['Access-Control-Allow-Methods'] = 'GET';
    this.httpHeaders['Content-Type'] = 'application/json';
    return this.http.get(url+email, {
      headers: new HttpHeaders(this.httpHeaders)
    });
  }



  /* --- GET with pagination --- */
  public getByPage(
    url: string,
    page = '0',
    pageSize = '0'
  ): Observable<Object | undefined> {
    this.httpHeaders['Access-Control-Allow-Methods'] = 'GET';
    this.httpHeaders['Content-Type'] = 'application/json';
    const header = {
      headers: new HttpHeaders(this.httpHeaders),
      params: new HttpParams().set('page', page).set('pageSize', pageSize), // Request Param
    };
    return this.http.get(url, header);
  }

  /* ---  GET file--- */
  public getFile(url: string): Observable<Object | undefined> {
    this.httpHeaders['Access-Control-Allow-Methods'] = 'GET';
    this.httpHeaders['Content-Type'] = 'application/pdf';
    return this.http.get(url, {
      headers: new HttpHeaders(this.httpHeaders),
      responseType: 'blob' as 'json',
    });
  }

  /* --- GET file by requestparam--- */
  public getFileByRequestParam(
    url: string,
    filename: string
  ): Observable<Object | undefined> {
    this.httpHeaders['Access-Control-Allow-Methods'] = 'GET';
    this.httpHeaders['Content-Type'] = 'application/pdf';
    const header = {
      headers: new HttpHeaders(this.httpHeaders),
      responseType: 'blob' as 'json',
      params: new HttpParams().set('fileName', filename), // Request Param
    };
    return this.http.get(url, header);
  }
  /* --- PUT method --- */
  public put(
    url: string,
    data: any,
  ): Observable<Object | undefined> {
    this.httpHeaders['Access-Control-Allow-Methods'] = 'PUT';
    this.httpHeaders['Content-Type'] = 'application/json';
    return this.http.put(url, data, {
      headers: new HttpHeaders(this.httpHeaders),
    });
  }
  /* --- POST method --- */
  public post(
    url: string,
    data: any
  ): Observable<Object | undefined> {
    this.httpHeaders['Access-Control-Allow-Methods'] = 'POST';
    this.httpHeaders['Content-Type'] = 'application/json';
    return this.http.post(url, data, {
      headers: new HttpHeaders(this.httpHeaders),
    });
  }
  /* --- POST method --- */
  public postGetFile(
    url: string,
    data: any
  ): Observable<Object | undefined> {
    this.httpHeaders['Access-Control-Allow-Methods'] = 'POST';
    this.httpHeaders['Content-Type'] = 'application/json';
    return this.http.post(url, data, {
      headers: new HttpHeaders(this.httpHeaders),
      responseType: 'blob' as 'json',
    });
  }
  /* --- DELETE method --- */
  public deleteByid(url: string,id:number): Observable<Object | undefined> {
    this.httpHeaders['Access-Control-Allow-Methods'] = 'DELETE';
    this.httpHeaders['Content-Type'] = 'application/json';
    return this.http.delete(url+id, {
      headers: new HttpHeaders(this.httpHeaders),
    });
  }
}
