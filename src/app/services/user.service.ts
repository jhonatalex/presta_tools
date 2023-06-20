import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserService{
    public urlApi:string;//url de la API; aun sin definir 
    public identity:string;

    constructor(
        private http: HttpClient
    ){this.urlApi = '';
      this.identity = '';}

    registerUser(user:User):Observable<User>{
        let json = JSON.stringify(user); //convierte objeto de js en JSON
        let params = 'json=' + json; //crea parametro JSON para enviar a la api
        console.log(params);
        let headers = new HttpHeaders().set('content-type','');//definiendo cabeceras

        return this.http.post<User>(this.urlApi + 'registro',params,{headers:headers});//peticion AJAX de tipo post para guardar en API
    }

    signup(user:User):Observable<User>{
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        localStorage.setItem('params', params);//almacena en memoria del navegador
        let headers = new HttpHeaders().set('content-type','');//definiendo cabeceras

        return this.http.post<User>(this.urlApi +'acceso',params,{headers:headers});
    }

    getIdentity(){
        let identity = localStorage.getItem('params');
        console.log(identity);
    }
}