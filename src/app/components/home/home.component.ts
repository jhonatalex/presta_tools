import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { UtilService } from 'src/app/shared/services/util.service';
import { Constants } from 'src/app/shared/constants/settings.class';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/app/register/models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[CategoryService]
})
export class HomeComponent implements OnInit {
  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;
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
  public user: User = new User();
  constructor(
    private categoryService:CategoryService,
    private utilService: UtilService,
  ){}

  ngOnInit(): void {
    this.getCategories();//ejecuta funcion al iniciar y obtiene las categorias

    /*this.categoryService.editTool().subscribe(response=>{
      console.log(response);
    });*/
    this.user = this.utilService.getFromLocalStorage(this.loginKey);
  }


    getCategories() : void {
      this.categoryService.getCategories().subscribe((response: Category[])=>{
        let data = Object.values(response);//convierte objeto a arreglo
        this.categories = data[1];
      });
    }








}
