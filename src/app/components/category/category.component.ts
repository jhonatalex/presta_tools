import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { ActivatedRoute,Params } from '@angular/router';
import { Tool } from 'src/app/models/tool.model';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService,ToolService]
})
export class CategoryComponent implements OnInit {
  public category:Category;
  public id:number;
  tools: any;
  toolCat: any[]=[];
  
  

  constructor(
    private categoryService:CategoryService,
    private route: ActivatedRoute,
    private toolService: ToolService,

  ){this.id = 0;
     this.category = new Category (0,'','','','');
    }//instancia vacia para guardar categoria por id

  ngOnInit(): void {
    this.getCategoryDetail();//ejecuta funcion al iniciar componente
    this.getTools();
  }

  getTools(): void{
    this.toolService.getTools().subscribe((response: Tool[])=>{
      let data = Object.values(response);//convierte objeto a arreglo
      this.tools = data[1];
      console.log(this.tools);

      //listar categorias en array de Tools
      for (let i=0; i<this.tools.length; i++){
        let dato = this.tools[i].objetoCategoria.titleCat;
        console.log(dato);
      }
      
      
    });
  }

  getCategoryDetail(){
      //obtener el  id de la URL  
      this.route.params.subscribe(params =>{
      this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero

      this.categoryService.getDetailCategory(this.id).subscribe((response:Category)=>{
      let data = Object.values(response);
      this.category = data[1];
      console.log(this.category);
    })

    });
  }

 


}

