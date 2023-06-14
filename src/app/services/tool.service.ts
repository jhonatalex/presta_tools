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
        this.tools = [ new Tool(0,'Taladro','taladro 110/220v','new',' Dewalt','lorem.jkljhadshad hdsjdak asdyasdaysd gddasduaidouadoi gdsagdau udiasduggjsd udsiadusdiaduioad','',10000,500,5,10,32,8,'assets/img/taladro.png','assets/img/taladro1.png','image_3.png','','',10,0,0,0,new Date),
                       new Tool(0,'Martillo Demoledor','martillo 110/220v','new','Dowen Pagio','lorem.jkljhadshad hdsjdak asdyasdaysd gddasduaidouadoi gdsagdau udiasduggjsd udsiadusdiaduioad','w',10000,500,5,10,32,8,'assets/img/martilloDemoledor.png','assets/img/martilloDemoledor1.png','image_3.png','','',10,0,0,0,new Date),
                       new Tool(0,'Esmeril','esmeril pulidora 110/220v','new','EMTOP','lorem.jkljhadshad hdsjdak asdyasdaysd gddasduaidouadoi gdsagdau udiasduggjsd udsiadusdiaduioad','widg',10000,500,5,10,32,8,'assets/img/esmeril.png','assets/img/esmeril1.png','image_3.png','','',10,0,0,0,new Date),
                       new Tool(0,'Sierra Caladora','caladora 110/220v','new','Total','lorem.jkljhadshad hdsjdak asdyasdaysd gddasduaidouadoi gdsagdau udiasduggjsd udsiadusdiaduioad','wid',10000,500,5,10,32,8,'assets/img/sierraCaladora.png','assets/img/sierraCaladora1.png','image_3.png','','',10,0,0,0,new Date),
                       new Tool(0,'Compactadora','compactadora 110/220v','new','Wiker Newson','lorem.jkljhadshad hdsjdak asdyasdaysd gddasduaidouadoi gdsagdau udiasduggjsd udsiadusdiaduioad','wi',10000,500,5,10,32,8,'assets/img/compactadora.png','assets/img/compactadora1.png','image_3.png','','',10,0,0,0,new Date),
                       new Tool(0,'Tronzadora','tronzadora grande 110/220v','new','BOSCH','lorem.jkljhadshad hdsjdak asdyasdaysd gddasduaidouadoi gdsagdau udiasduggjsd udsiadusdiaduioad','widget',10000,500,5,10,32,8,'assets/img/tronzadora.png','assets/img/tronzadora1.png','image_3.png','','',10,0,0,0,new Date),
                       new Tool(0,'Roto Martillo','rotomartillo 110/220v','new','Milwaukee','lorem.jkljhadshad hdsjdak asdyasdaysd gddasduaidouadoi gdsagdau udiasduggjsd udsiadusdiaduioad','widge',10000,500,5,10,32,8,'assets/img/rotoMartillo.png','assets/img/rotoMartillo1.png','image_3.png','','',10,0,0,0,new Date)
                     ];
        return this.tools;
    }

    getDetailTool(id:number){
        let tool: Tool = this.tools[id];
        return tool;
    }
}