import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tool } from "../models/tool.model";

@Injectable()
export class ToolService{
    public tools:Tool[];

    constructor(
        private http:HttpClient
    ){
        this.tools = [];  
    }

    createTools(){
        this.tools = [ new Tool(0,'Máquina de soldar','maquina de soldar 110/220v',10000,50,'img.jpg'),
                       new Tool(1,'Esmeril','descripción',15000,3,'img2.jpg'),
                       new Tool(2,'Taladro Dewalt','con funcion roto martillo',10000,5,'img2.jpg'),
                     ];
        return this.tools;
    }

    getDetailTool(id:number){
        let tool: Tool = this.tools[id];
        return tool;
    }
}