import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentServices } from '../../providers/payment.service';
import { ResponseApi } from 'src/app/shared/models/responseApi.model';
import { Venta } from '../../models/venta.models';
import { DetailedPeerCertificate } from 'tls';
import { DetalleVenta } from '../../models/details_venta';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

    public venta : Venta = new Venta();
    public detalleVenta: DetalleVenta = new DetalleVenta();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private paymentServices:PaymentServices,
    private spinner: NgxSpinnerService,

    ) { }


  ngOnInit() {

  this.spinner.show();

    this.route.queryParams.subscribe(params => {
      const token = params['token_ws'];
      console.log(token);
      if (token) {
        this.enviarTokenParaConfirmarTransaccion(token);
      }
    });
  }


  enviarTokenParaConfirmarTransaccion(token: string) {
    const data = { 'token': token };


    console.log(data);
    this.paymentServices.verifyTransaction(data);


  }




}
