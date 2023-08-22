import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token_ws'];

      if (token) {
        // Aquí tienes el token, ahora puedes enviarlo a otra API
        this.enviarTokenParaConfirmarTransaccion(token);
      }
    });
  }


  enviarTokenParaConfirmarTransaccion(token: string) {
    const otraAPIUrl = 'URL_DE_LA_OTRA_API';
    const data = { token_ws: token };










  }




}
