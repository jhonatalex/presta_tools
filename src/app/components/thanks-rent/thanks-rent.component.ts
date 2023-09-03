import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from 'src/app/shared/models/responseApi.model';

@Component({
  selector: 'app-thanks-rent',
  templateUrl: './thanks-rent.component.html',
  styleUrls: ['./thanks-rent.component.css']
})
export class ThanksRentComponent implements OnInit {
public data : any
  constructor(private route: Router) { }

  ngOnInit(): void {
    const navigationState = this.route.getCurrentNavigation()?.extras?.state;
    const responseApi = navigationState?.['responseApi'];

    if (responseApi) {

      this.data = Object.values(responseApi);
      

     console.log(this.data);



    }
  }

}
