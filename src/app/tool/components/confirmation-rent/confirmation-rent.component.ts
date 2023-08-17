import { Component, OnInit } from '@angular/core';
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

  formulario: FormGroup;
  url: string = ''; // Inicializar la URL con un valor vacío
  token: string = ''; // Inicializar el token con un valor vacío



  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolServiceNew,
    private paymentServices:PaymentServices,
    private utilservice: UtilService,
    private formBuilder: FormBuilder,

  ) {
    this.id = 0;
    this.tool = new ToolResponse();
    this.formulario = this.formBuilder.group({
      token_ws: [''],
    });
    }

  ngOnInit(): void {
    this.getToolDetail();
    this.getUser();



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
  onSubmit(Form:NgForm){


  }
  onSubmitPagar(FormData:NgForm){

  }

  async iniciarTransaccion(){


    var buyOrder = '0001';
    var sessionId='compra';
    var amount:number = 1000;
    var returnUrl ="http://localhost:4200/confirmar-transaccion"


    var payData:PayData= new PayData();

    payData.amount=amount;
    payData.buyOrder=buyOrder;
    payData.sessionId=sessionId;
    payData.returnUrl=returnUrl;

    this.paymentServices.initTransaction(payData).subscribe((response:PayResponse)=>{


      if(response!=null){

        this.token = response.token;
        this.url = response.url;

        this.formulario.get('token_ws')!.setValue(this.token);

        console.log(response)

        this.submitForm();

      }

    },
    (error) => {
      console.error('Error al iniciar la transacción:', error);
    })

  }

  submitForm() {
    const formElement = document.getElementById(
      'form-pago'
    ) as HTMLFormElement;
    formElement.submit();
  }



}
