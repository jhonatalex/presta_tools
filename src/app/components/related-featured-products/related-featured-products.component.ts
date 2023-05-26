import { Component, OnInit } from '@angular/core';
import { ToolService } from '../../services/tool.service';
import { Tool } from '../../models/tool.model';

@Component({
  selector: 'app-related-featured-products',
  templateUrl: './related-featured-products.component.html',
  styleUrls: ['./related-featured-products.component.css'],
  providers:[ToolService ]
})
export class RelatedFeaturedProductsComponent implements OnInit {
  public tools:Tool[];
  

  constructor(private toolService: ToolService) {
    this.tools = [];
  }

  ngOnInit(): void {
    this.getTools();//ejecuta funcion de obtener herramientas al inicio de componente
  }

  getTools(){
    this.tools = this.toolService.createTools();//funcion que obtiene el array de herramientas desde el servicio
  }

}
