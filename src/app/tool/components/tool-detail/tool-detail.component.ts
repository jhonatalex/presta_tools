import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { Tool, ToolResponse } from '../../models/tool.model';
import { FormControl } from '@angular/forms';
import { ToolServiceNew } from '../../providers/tool.service';
import { Category } from 'src/app/category/models/category.model';
import { Lender } from 'src/app/Lender/models/lender.model';


@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.css'],
  providers:[ToolServiceNew]
})
export class ToolDetailComponent implements OnInit {
  public tool: ToolResponse;
  public id: number;
  public rating = new FormControl();
  public toolCat: any;
  public category: Category|null =null;
  public lender: Lender| null = null;
  public starRating =0;

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolServiceNew,

  ){
    this.id = 0;
    this.tool = new ToolResponse ();//instancia vacia para guardar tool por id
    this.category= new Category();
    this.lender = new Lender();
    this.starRating = 0;
  }

  ngOnInit(): void {
    this.getToolDetail()//saca detalle de Tool por su ID
  }


    /*
    getRating(){
      this.tool.rate = this.rating.value;
      console.log(this.tool.rate);
    }
    */


    getToolDetail(): void{
        //obtener el  id de la URL
        this.route.params.subscribe(params =>{
        this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero
        //obtiene la herramienta por id
        this.toolService.getDetailToolProviders(this.id).subscribe((response:ToolResponse)=>{
        this.tool = response
        console.log(this.tool);

        //obtener categoria
        //let dato:any = Object.values(response.data)[23];
        this.category = response.objetoCategoria;
        this.lender = response.objetoLender;
        console.log(this.category);
      })

      });
    }


}


