import { Component, OnInit } from '@angular/core';
import { PaymentServices } from 'src/app/payment/providers/payment.service';
import { User } from 'src/app/register/models/user.model';

@Component({
  selector: 'app-fails-transaction',
  templateUrl: './fails-transaction.component.html',
  styleUrls: ['./fails-transaction.component.css']
})
export class FailsTransactionComponent implements OnInit {
  apiResponse : any;
  detalleVenta:any;
  venta:any;
  public tool: any;
  public user: User;

  constructor(
    private payServices: PaymentServices,
  ) {this.user = new User;
    
    payServices.getData().subscribe({

    next: data =>{
    this.apiResponse = data;
    this.venta = this.apiResponse.data;
    this.detalleVenta = this.apiResponse.data.detalleVenta[0];
    this.tool = this.apiResponse.data.detalleVenta[0].idToolNavigation;
    this.user = this.apiResponse.data.idUserNavigation;


    console.log(data);
    console.log(this.user);

    }
  }) }

  ngOnInit(): void {
  }

}
