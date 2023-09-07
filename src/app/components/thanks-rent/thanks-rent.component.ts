import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentServices } from 'src/app/payment/providers/payment.service';
import { ResponseApi } from 'src/app/shared/models/responseApi.model';

@Component({
  selector: 'app-thanks-rent',
  templateUrl: './thanks-rent.component.html',
  styleUrls: ['./thanks-rent.component.css']
})
export class ThanksRentComponent implements OnInit {

  apiResponse : any;
  detalleVenta:any;
  venta:any;
  tool: any;

  constructor(private router: ActivatedRoute, payServices: PaymentServices) {

    payServices.getData().subscribe({

      next: data =>{
      this.apiResponse= data;
      this.venta = this.apiResponse.data;
      this.detalleVenta = this.apiResponse.data.detalleVenta[0];
      this.tool = this.apiResponse.data.detalleVenta[0].idToolNavigation

      console.log(data)

      }
    })

  }

  ngOnInit(): void {


  }



}
