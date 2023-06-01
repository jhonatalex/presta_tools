import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { Tool } from 'src/app/models/tool.model';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-confirmation-rent',
  templateUrl: './confirmation-rent.component.html',
  styleUrls: ['./confirmation-rent.component.css'],
  providers:[ToolService]
})
export class ConfirmationRentComponent implements OnInit {
  public id:number;
  public tool:Tool;

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolService
  ) {this.id = 0;
    this.tool = new Tool (0,'','','','','','',0,0,0,0,0,0,'','','','','',0,0,0,0,new Date);//instancia vacia para guardar tool por id
    }

  ngOnInit(): void {
    this.getId();
    this.getToolDetail();
  }


  getId(): void{
    //obtener el  id de la URL  
    this.route.params.subscribe(params =>{
    this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero
    console.log(this.id);
    });
  }

  getToolDetail(): void{
    this.toolService.createTools();//Obtiene array de herramientas del servicio
    this.tool = this.toolService.getDetailTool(this.id);//obtiene la herramienta por su ID
    console.log(this.tool);
  }

  onSubmit(Form:NgForm){
    
  }

}
