import { Component, OnInit } from '@angular/core';
import { ToolService } from '../../services/tool.service';
import { CategoryService } from 'src/app/services/category.service';
import { Tool } from '../../models/tool.model';
import { Category } from 'src/app/models/category.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ToolService,CategoryService]
})
export class HomeComponent implements OnInit {
  public tools:Tool[];
  public categories:Category[];

  constructor(
    private toolService:ToolService,
    private categoryService:CategoryService
  ){this.tools = [];
    this.categories = [];
    }

  ngOnInit(): void {
    this.getTools();//ejecuta funcion de obtener herramientas al inicio de componente
    this.getCategories();//ejecuta funcion al iniciar y obtiene las categorias
  }


    

    getTools(){
      this.tools = this.toolService.createTools();//funcion que obtiene el array de herramientas desde el servicio
    }

    getCategories(){
      this.categories = this.categoryService.createCategories()//obtiene categorias desde el servicio
    }



  

    
}
