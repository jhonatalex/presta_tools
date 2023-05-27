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



  slides = [
    { img: 'https://via.placeholder.com/600.png/09f/fff' },
    { img: 'https://via.placeholder.com/600.png/021/fff' },
    { img: 'https://via.placeholder.com/600.png/321/fff' },
    { img: 'https://via.placeholder.com/600.png/422/fff' },
    { img: 'https://via.placeholder.com/600.png/654/fff' },
  ];
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };
  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }




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
