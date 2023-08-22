import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../providers/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-slider-category',
  templateUrl: './slider-category.component.html',
  styleUrls: ['./slider-category.component.css']
})
export class SliderCategoryComponent implements OnInit {

  public categories:any;


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
       dots: false
     }
   },
   {
     breakpoint: 600,
     settings: {
       slidesToShow: 2,
       slidesToScroll: 1,
       infinite: true,
       dots: false
     }
   },
   {
     breakpoint: 480,
     settings: {
       slidesToShow: 1,
       slidesToScroll: 1,
       infinite: true,
       dots: false
     }
   }
 ]};

slickInit(e: any) {
//console.log('slick initialized');
}
breakpoint(e: any) {
//console.log('breakpoint');
}
afterChange(e: any) {
//console.log('afterChange');
}
beforeChange(e: any) {
console.log('beforeChange');
}



  constructor(
    private categoryService:CategoryService,

  ) { }

  ngOnInit(): void {

    this.getCategories();//ejecuta funcion al iniciar y obtiene las categorias



  }


  getCategories() : void {
    this.categoryService.getListCategoryProviders().subscribe((response: Category[])=>{
      this.categories = response;
    });
  }



}
