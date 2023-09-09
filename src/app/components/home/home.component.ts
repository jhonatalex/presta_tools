import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category/models/category.model';
import { UtilService } from 'src/app/shared/services/util.service';
import { Constants } from 'src/app/shared/constants/settings.class';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/app/register/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { PaymentServices } from 'src/app/payment/providers/payment.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[]
})
export class HomeComponent implements OnInit {
  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production? '' : 'D3V'
  }`;



  public categories:any;
  public user: User = new User();
  public url: any;
  constructor(
    private utilService: UtilService,
    private route:ActivatedRoute,
    private paymentServices: PaymentServices,
  ){}

  ngOnInit(): void {
   
    this.user = this.utilService.getFromLocalStorage(this.loginKey);
   // this.getUrlSegment()//para redireccion al entrar en verify-user

  }


//obtiene el ultimo segmento de la ruta
  /*  getUrlSegment():void{
      //obtener la URL
      this.route.url.subscribe(params =>{
      this.url = params;
      this.paymentServices.setDataUrl(this.url); //envia url para redireccion
      })
    }*/








}
