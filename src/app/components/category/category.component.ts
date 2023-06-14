import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {
  public categories:Category[];

  constructor(
    private categoryService:CategoryService
  ) {this.categories = [];
   }

  ngOnInit(): void {
    this.getCategories()
    console.log(this.categories);//ejecuta funcion al iniciar y obtiene las categorias
  }


  getCategories(){
    this.categories = this.categoryService.createCategories()//obtiene categorias desde el servicio
  }

}



