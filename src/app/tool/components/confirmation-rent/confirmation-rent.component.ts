import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { Tool, ToolResponse } from 'src/app/tool/models/tool.model';
import { ToolServiceNew } from '../../providers/tool.service';
import { WebpayPlus } from 'transbank-sdk'; // ES6 Modules
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'; // ES6 Modules


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


  async iniciarTransaccion(){
    console.log('click');

    const WebpayPlus = require("transbank-sdk").WebpayPlus; // CommonJS
    const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require("transbank-sdk"); // CommonJS

    const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));

    var buyOrder = '1';
    var sessionId='compra';
    var amount:number = 100;
    var returnUrl ="http://localhost:4200/gracias"

    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);


  }



}
