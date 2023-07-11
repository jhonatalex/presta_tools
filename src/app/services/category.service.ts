import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";
import { Tool } from "../models/tool.model";

@Injectable()
export class CategoryService{
    public categories: Category[];
    public urlApi: string = 'https://www.prestatools.somee.com';

    constructor(
        private http:HttpClient
    ){this.categories = [];}

    

    getCategories():Observable<Category[]>{
        return this.http.get<Category[]>(this.urlApi + '/api/Categoria/list')
    }
    getDetailCategory(id:number):Observable<Category>{
        return this.http.get<Category>(this.urlApi + '/api/Categoria/get/'+ id);
    }
    editTool():Observable<Tool>{
        return this.http.put<Tool>(this.urlApi + '/api/tool/edit',{"id":1,
                                                                    "urlImagen":"assets/img/taladro.png"});
    }

}    