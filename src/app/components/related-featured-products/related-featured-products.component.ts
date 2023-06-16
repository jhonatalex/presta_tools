import { Component, OnInit } from '@angular/core';
import { ToolService } from '../../services/tool.service';
import { Tool } from '../../models/tool.model';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-related-featured-products',
  templateUrl: './related-featured-products.component.html',
  styleUrls: ['./related-featured-products.component.css'],
  providers:[ToolService ]
})
export class RelatedFeaturedProductsComponent implements OnInit {
  public tools:Tool[];
  

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
    {
    this.tools = [];
    
    }

  ngOnInit(): void {
    this.getTools();//ejecuta funcion de obtener herramientas al inicio de componente
  }

  getTools(): void{
    this.tools = this.toolService.createTools();//funcion que obtiene el array de herramientas desde el servicio
  }


}
