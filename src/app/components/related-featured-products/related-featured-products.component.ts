import { Component, OnInit } from '@angular/core';
import { ToolService } from '../../services/tool.service';

import { ActivatedRoute,Params } from '@angular/router';
import { Tool } from 'src/app/add-tool/models/tool.model';

@Component({
  selector: 'app-related-featured-products',
  templateUrl: './related-featured-products.component.html',
  styleUrls: ['./related-featured-products.component.css'],
  providers:[ToolService ]
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

  constructor(
    private toolService: ToolService,
    private route: ActivatedRoute)
    {}

  ngOnInit(): void {
    this.getTools();//ejecuta funcion de obtener herramientas al inicio de componente
  }

  getTools(): void{
    this.toolService.getTools().subscribe((response: Tool[])=>{
      let data = Object.values(response);//convierte objeto a arreglo
      this.tools = data[1];
    });
  }


}
