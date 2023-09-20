import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentServices } from 'src/app/payment/providers/payment.service';
import { ResponseApi } from 'src/app/shared/models/responseApi.model';
import { Tool } from 'src/app/tool/models/tool.model';
import { ToolServiceNew } from 'src/app/tool/providers/tool.service';

@Component({
  selector: 'app-thanks-rent',
  templateUrl: './thanks-rent.component.html',
  styleUrls: ['./thanks-rent.component.css']
})
export class ThanksRentComponent implements OnInit {

  apiResponse : any;
  detalleVenta:any;
  venta:any;
  public tool: Tool;
  public toolUpdate: Tool;

  constructor(private router: ActivatedRoute, payServices: PaymentServices, private toolService: ToolServiceNew) {

    payServices.getData().subscribe({

      next: data =>{
      this.apiResponse= data;
      this.venta = this.apiResponse.data;
      this.detalleVenta = this.apiResponse.data.detalleVenta[0];
      this.tool = this.apiResponse.data.detalleVenta[0].idToolNavigation

      console.log(data);

      }
    })

    this.toolUpdate = new Tool;
    this.tool = new Tool;
  }

  ngOnInit(): void {
      this.updateTool();

  }

  updateTool():void{

    this.toolUpdate = this.tool;
    this.toolUpdate.state = 'rentado';
    this.toolService.updateTool(this.tool);
  } 



}
