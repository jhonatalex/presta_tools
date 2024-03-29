import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/category/models/category.model';
import { ActivatedRoute,Params } from '@angular/router';
import { Tool, ToolResponse } from 'src/app/tool/models/tool.model';

import { CategoryService } from '../../providers/category.service';
import { ToolServiceNew } from 'src/app/tool/providers/tool.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[]
})
export class CategoryComponent implements OnInit {
  public category:Category;
  public id:number;
  tools: any;
  toolCat: any[]=[];
  public page! : number;


  constructor(
    private categoryService1:CategoryService,
    private route: ActivatedRoute,
    private toolService:ToolServiceNew,


  ){this.id = 0;
     this.category = new Category ();
    }//instancia vacia para guardar categoria por id

  ngOnInit(): void {
    this.getCategoryDetail();//ejecuta funcion al iniciar componente
    this.getTools();
  }

  getCategoryDetail():void{
      //obtener el  id de la URL
      this.route.params.subscribe(params =>{
      this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero

      this.categoryService1.getDetailCategoryProviders(this.id).subscribe((response:Category)=>{
      // let data = Object.values(response);
      this.category = response;
      })

    });
  }


  getTools(): void{
    this.toolService.getListTool().subscribe((response: ToolResponse[])=>{
      this.tools = response
    });
  }

}

