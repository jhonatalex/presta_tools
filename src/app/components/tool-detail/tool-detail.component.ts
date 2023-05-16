import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { ToolService } from '../../services/tool.service';
import { Tool } from '../../models/tool.model';


@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.css'],
  providers:[ToolService]
})
export class ToolDetailComponent implements OnInit {
  public tool: Tool;
  public id: number;

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolService  
  ){
    this.id = 0;
    this.tool = new Tool (0,'','',0,0,'');//instancia vacia para guardar tool por id
    }

  ngOnInit(): void {
    this.getId();//saca el id de la URL
    this.getToolDetail()//saca detalle de Tool por su ID
  }

    getId(){
      //obtener el  id de la URL  
      this.route.params.subscribe(params =>{
      this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero
      console.log(this.id);
      
      });
    }

    getToolDetail(){
      this.toolService.createTools();//Obtiene array de herramientas del servicio
      this.tool = this.toolService.getDetailTool(this.id);//obtiene la herramienta por su ID
      console.log(this.tool);
    }


}


