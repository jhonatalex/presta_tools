import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[CategoryService]
})
export class HomeComponent implements OnInit {

  slideConfig = {slidesToShow:3,
                 slidesToScroll:1,
                 autoplay: false,
                 autoplaySpeed: 2500,
                 infinite: true,
                 speed: 300,
                 dots: false,
                 responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                  }
                }
              ]};

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


  public categories:any;

  constructor(
    private categoryService:CategoryService
  ){}

  ngOnInit(): void {
    this.getCategories();//ejecuta funcion al iniciar y obtiene las categorias

    /*this.categoryService.editTool().subscribe(response=>{
      console.log(response);
    });*/
  }


    getCategories() : void {
      this.categoryService.getCategories().subscribe((response: Category[])=>{
        let data = Object.values(response);//convierte objeto a arreglo
        this.categories = data[1];
        console.log(this.categories);
      });
    }








}
