import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { User } from 'src/app/register/models/user.model';
import { Constants } from 'src/app/shared/constants/settings.class';
import { UtilService } from 'src/app/shared/services/util.service';
import { Tool, ToolResponse } from 'src/app/tool/models/tool.model';
import { environment } from 'src/environments/environment.prod';
import { ToolServiceNew } from '../../providers/tool.service';
import { PayData } from 'src/app/payment/models/payData.models';
import { PaymentServices } from 'src/app/payment/providers/payment.service';
import { PayResponse } from 'src/app/payment/models/payResponse.models';
import { Venta } from 'src/app/payment/models/venta.models';
import { DetalleVenta } from 'src/app/payment/models/details_venta';


@Component({
  selector: 'app-confirmation-rent',
  templateUrl: './confirmation-rent.component.html',
  styleUrls: ['./confirmation-rent.component.css'],
  providers:[ToolServiceNew]
})
export class ConfirmationRentComponent implements OnInit {
  public id:number;
  public tool:ToolResponse;
  public startDate: Date = new Date();
  public endDate: Date = new Date();
  public days:number=0;
  public total:number=0;
  public nameLender: string | undefined;
  public lastNameLender: string|undefined;
  public user: User= new User;
  public minDate: string = new Date().toISOString();


  @ViewChild('paymentForm') paymentForm: ElementRef | undefined;

  url: string = ''; // Inicializar la URL con un valor vacío
  token: string = ''; // Inicializar el token con un valor vacío

  responseModel: PayResponse| null = null ;


  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolServiceNew,
    private paymentServices:PaymentServices,
    private utilservice: UtilService,
    private cdr: ChangeDetectorRef


  ) {
    this.id = 0;
    this.tool = new ToolResponse();
    this.responseModel = new PayResponse();

    }

  ngOnInit(): void {
    this.getToolDetail();
    this.getUser();
    console.log(this.minDate)

  }

  setInitialDate(event:any):void{
    this.startDate = event.target.value;
  }

setEndDate(event:any){
  this.endDate = event.target.value;

  const initialDate = new Date (this.startDate);
  const finalDate = new Date(this.endDate);
   let c= initialDate;
   const dates = [];

  while(c <= finalDate){
  dates.push(new Date(c))
     c.setDate(c.getDate()+1)
   }
   this.days = dates.length-1;
  this.total = this.days * this.tool.valueRent;

}


getUser():void{
 this.user= this.utilservice.getFromLocalStorage(this.loginKey + 'D3V');
}




getToolDetail(): void{
//obtener el  id de la URL
this.route.params.subscribe(params =>{
 this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero
 this.toolService.getDetailToolProviders(this.id).subscribe((response:ToolResponse)=>{
  this.tool = response
  this.nameLender = response.objetoLender?.name;
  this.lastNameLender = response.objetoLender?.lastName;
    })

});


  }


  onSubmit(ngForm:NgForm) {


    //Tabla VENTA
    //TIpo comprobante (Boleta o Factura)
    //Numero Compraban BuyOrder
    //Date
    // Tax
    //total = amount
    // State= por Pagar
    //ID USER (EMAIL)

    let buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    let sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;


    var amount:number = 1000;
    var returnUrl ="http://localhost:4200/confirmar-transaccion"


    //VENTA
    var venta: Venta = new Venta();
    venta.IdUser = this.user.email;
    venta.NumberComprobante= buyOrder;
    venta.State=false;
    venta.TypeComprobante="Boleta";

    //TABLA DETALLE VENTA
    var detalleVenta: DetalleVenta = new DetalleVenta();
    detalleVenta.Amount=amount;
    detalleVenta.IdTool=  this.tool.id;
    detalleVenta.Price = this.tool.valueRent;
    detalleVenta.RentalDays=this.days;
    detalleVenta.StartDate= this.startDate.toString();
    detalleVenta.EndDate = this.endDate.toString();
    detalleVenta.Total = this.total;

    //Pay DATA
    var payData:PayData= new PayData();
    payData.amount=amount;
    payData.buyOrder=buyOrder;
    payData.sessionId=sessionId;
    payData.returnUrl=returnUrl;
    payData.ventum = venta;
    payData.detalleVentum = detalleVenta;



    this.iniciarTransaccion(payData);

  }




  async iniciarTransaccion(payData:PayData){

    console.log(payData);

    this.paymentServices.initTransaction(payData).subscribe((response:PayResponse)=>{
    this.responseModel=response;

      if(response!=null){

        this.token = response.token;
        this.url = response.url;

        this.cdr.detectChanges();
        //console.log(response);
        this.submitFormPay();

      }

    },
    (error) => {
      console.error('Error al iniciar la transacción:', error);
    })

  }

  submitFormPay() {

    const form = document.getElementById('returForm') as HTMLFormElement;
    form.submit();
  }

  /*
  onSubmitPay(formulario:NgForm) {

    const formElement = document.getElementById(
      'form-pago'
    ) as HTMLFormElement;
    formElement.submit();
  }
  */



}
