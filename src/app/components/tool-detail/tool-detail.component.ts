import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { ToolService } from '../../services/tool.service';
import { Tool } from '../../add-tool/models/tool.model';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.css'],
  providers:[ToolService]
})
export class ToolDetailComponent implements OnInit {
  public tool: Tool;
  public id: number;
  public rating = new FormControl();
  public toolCat: any;
  category: any;

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolService
  ){
    this.id = 0;
    this.tool = new Tool ();//instancia vacia para guardar tool por id
  }

  ngOnInit(): void {
    this.getToolDetail()//saca detalle de Tool por su ID
  }



    getRating(){
      this.tool.rate = this.rating.value;
      console.log(this.tool.rate);
    }



    getToolDetail(): void{
        //obtener el  id de la URL
        this.route.params.subscribe(params =>{
        this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero
        //obtiene la herramienta por id
        this.toolService.getDetailTool(this.id).subscribe((response:Tool)=>{
        let data = Object.values(response);
        this.tool = data[0];
        console.log(this.tool);
      })

      });
    }


}


