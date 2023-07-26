import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tool } from "../add-tool/models/tool.model";

@Injectable()
export class ToolService{
    public tools:Tool[];
    public urlApi:string='https://www.prestatools.somee.com'

    constructor(
        private http:HttpClient
    ){
        this.tools = [];
    }

    getTools():Observable<Tool[]>{
        return this.http.get<Tool[]>(this.urlApi + '/api/tool/list')
    }

    getDetailTool(id:number):Observable<Tool>{
        return this.http.get<Tool>(this.urlApi + '/api/tool/get/tool/'+ id);
    }
}
