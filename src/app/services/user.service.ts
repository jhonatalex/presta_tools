import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { Constants } from "../utils/constants/constants-settings";

@Injectable()
export class UserService{
    public urlApi:string;
    private httpHeaders = new Constants().getHeadersOptions().headers;
    constructor(
        private http: HttpClient,
    ){this.urlApi = 'https://www.prestatools.somee.com';
      }

    registerUser(user:User):Observable<User>{
        let json = JSON.stringify(user); //convierte objeto de js en JSON
        let params = 'json=' + json; //crea parametro JSON para enviar a la api
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        console.log(params);
        return this.http.post<User>(this.urlApi + '/api/user/insert',params,{headers: headers});//peticion AJAX de tipo post para guardar en API
    }

    signup(user:User):Observable<User>{
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        return this.http.post<User>(this.urlApi +'/api/user/login',params);
    }

    public post(urlEndpoint: string,data:any):Observable<Object | undefined>{
        this.httpHeaders['Access-Control-Allow-Methods'] = 'POST';
        this.httpHeaders['Content-Type'] = 'application/json';
        return this.http.post(this.urlApi + urlEndpoint, data, {headers: new HttpHeaders(this.httpHeaders),
        });
      }

    

  
}
