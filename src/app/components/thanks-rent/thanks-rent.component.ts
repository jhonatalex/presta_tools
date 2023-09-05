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

  constructor(private router: ActivatedRoute, payServices: PaymentServices) {

    payServices.getData().subscribe({

      next: data =>{
      this.apiResponse= data;
      console.log(data)

      }
    })

  }

  ngOnInit(): void {


  }
}
