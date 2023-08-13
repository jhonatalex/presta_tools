import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { Tool, ToolResponse } from 'src/app/tool/models/tool.model';
import { ToolServiceNew } from '../../providers/tool.service';


@Component({
  selector: 'app-confirmation-rent',
  templateUrl: './confirmation-rent.component.html',
  styleUrls: ['./confirmation-rent.component.css'],
  providers:[ToolServiceNew]
})
export class ConfirmationRentComponent implements OnInit {
  public id:number;
  public tool:ToolResponse;

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolServiceNew
  ) {this.id = 0;
    this.tool = new ToolResponse();//instancia vacia para guardar tool por id
    }

  ngOnInit(): void {
    this.getId();
    this.getToolDetail();
  }

  setInitialDate(event:any){

  }


  getId(): void{
    //obtener el  id de la URL
    this.route.params.subscribe(params =>{
    this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero
    console.log(this.id);
    });
  }

  getToolDetail(): void{
    //obtener el  id de la URL
    this.route.params.subscribe(params =>{
    this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero

    this.toolService.getDetailToolProviders(this.id).subscribe((response:ToolResponse)=>{
    this.tool = response

    })

    });
  }

  onSubmit(Form:NgForm){

  }

}
