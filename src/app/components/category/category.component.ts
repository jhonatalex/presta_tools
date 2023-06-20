import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {
  public category:Category;
  public id:number;
  

  constructor(
    private categoryService:CategoryService,
    private route: ActivatedRoute

  ){this.id = 0;
     this.category = new Category (0,'','','','');
    }//instancia vacia para guardar categoria por id

  ngOnInit(): void {
    this.getId();//saca Id de ruta al iniciar
    this.getCategoryDetail()//ejecuta funcion al iniciar componente
  }


  getId(){
    //obtener el  id de la URL  
    this.route.params.subscribe(params =>{
    this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero
    console.log(this.id);
    
    });
  }

  getCategoryDetail(){
    this.categoryService.createCategories()//obtiene categorias desde el servicio
    this.category = this.categoryService.getDetailCategory(this.id);// obtiene la categoria por ID
    console.log(this.category);
  }


}

