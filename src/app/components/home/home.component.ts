import { Component, OnInit } from '@angular/core';
import { ToolService } from '../../services/tool.service';
import { Tool } from '../../models/tool.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ToolService]
})
export class HomeComponent implements OnInit {
  public tools:Tool[];

  constructor(
    private toolService:ToolService
  ){this.tools = [];}

  ngOnInit(): void {
    this.getTools();//ejecuta funcion de obtener herramientas al inicio de componente
  }

    getTools(){
      this.tools = this.toolService.createTools();//funcion que obtiene el array de herramientas desde el servicio
    }


}
