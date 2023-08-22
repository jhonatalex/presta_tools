import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Params } from '@angular/router';
import { Tool, ToolResponse } from 'src/app/tool/models/tool.model';
import { ToolServiceNew } from '../../providers/tool.service';
import { CategoryService } from 'src/app/category/providers/category.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-related-featured-products',
  templateUrl: './related-featured-products.component.html',
  styleUrls: ['./related-featured-products.component.css'],
  providers:[ToolServiceNew]
})
export class RelatedFeaturedProductsComponent implements OnInit {
  public tools:any;


  slideConfig = { slidesToShow:3,
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
                    },
                    {
                      breakpoint: 355,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                      }
                    }
      ]};

  slickInit(e: any) {
   // console.log('slick initialized');
  }
  breakpoint(e: any) {
   // console.log('breakpoint');
  }
  afterChange(e: any) {
   // console.log('afterChange');
  }
  beforeChange(e: any) {
    //console.log('beforeChange');
  }

  constructor(
    //private toolService: ToolService,
    private toolService:ToolServiceNew,
    private categoryService: CategoryService,
    private utilService:UtilService,
    private route: ActivatedRoute)
    {}

  ngOnInit(): void {
    this.getTools();//ejecuta funcion de obtener herramientas al inicio de componente
  }

  getTools(): void{
    this.toolService.getListTool().subscribe((response: ToolResponse[])=>{
      this.tools = response
    });
  }


}
