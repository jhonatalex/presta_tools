import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PaymentServices } from 'src/app/payment/providers/payment.service';

@Component({
  selector: 'app-thanks-rent',
  templateUrl: './thanks-rent.component.html',
  styleUrls: ['./thanks-rent.component.css']
})
export class ThanksRentComponent implements OnInit {



  constructor(
    private route: ActivatedRoute,
     private router: Router,
    private paymentServices:PaymentServices) { }

  ngOnInit() {

   // const stateData = this.route.snapshot.state;
  // o
  this.route.data.subscribe((data) => {
    const stateData = data;
    // Aquí puedes utilizar los datos del estado como desees
    console.log('componente activo thanks-rent: '+ stateData);
  });



   7// this.paymentServices.disparadorDATA.subscribe(data =>{
    //  console.log('recibiendo data...',data)
    //});



  }



}
