import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserService{
    public urlApi:string;//url de la API; aun sin definir 

    constructor(
        private http: HttpClient
    ){this.urlApi = 'https://www.prestatools.somee.com';
      }

    registerUser(user:User):Observable<User>{
        let json = JSON.stringify(user); //convierte objeto de js en JSON
        let params = 'json=' + json; //crea parametro JSON para enviar a la api
        console.log(params);
        return this.http.post<User>(this.urlApi + '/api/user/insert',params);//peticion AJAX de tipo post para guardar en API
    }

    signup(user:User):Observable<User>{
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        return this.http.post<User>(this.urlApi +'/api/user/login',params);
    }

  
}