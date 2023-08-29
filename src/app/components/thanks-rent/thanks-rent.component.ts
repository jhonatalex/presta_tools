import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thanks-rent',
  templateUrl: './thanks-rent.component.html',
  styleUrls: ['./thanks-rent.component.css']
})
export class ThanksRentComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    const navigationState = this.route.getCurrentNavigation()?.extras?.state;
    const responseApi = navigationState?.['responseApi'];

    if (responseApi) {
     console.log(responseApi);
    }
  }

}
