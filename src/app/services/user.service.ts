import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserService{
    constructor(){
    }

    registerUser(user:object){
        let json = JSON.stringify(user); //convierte objeto de js en JSON
        let params = 'json=' + json; //crea parametro JSON para enviar a la api
        console.log(params);
    }

    loginUser(){

    }
}