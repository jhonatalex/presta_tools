import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentServices } from 'src/app/payment/providers/payment.service';
import { User, UserUpdate } from 'src/app/register/models/user.model';
import { RegisterService } from 'src/app/register/providers/register.service';
import { REGIONES } from 'src/app/shared/constants/regiones.class';
import { Constants } from 'src/app/shared/constants/settings.class';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { ToolServiceNew } from 'src/app/tool/providers/tool.service';
import { environment } from 'src/environments/environment.prod';
import { Lender } from '../../models/lender.model';
import { LenderService } from '../../providers/lender.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {


  public user: User;
  public userUpdate: UserUpdate;
  public selectedRegion: string | null = null;
  public selectedComuna: string | null = null;
  public regiones: string[]=[];
  public comunas: string[]=[];
  public ConfirmPassword:string='';
  public urlRedireccion: any;
  

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  
  constructor(
    private utilservice: UtilService,
    private resgisterService: RegisterService,
    private sweetUIService:SweetUIService,
    private paymentServices: PaymentServices
  ) {

   this.user  = new User;
   this.userUpdate = new UserUpdate;
  }

  




  ngOnInit(): void {
    this.getUser();
    this.getRegionesArray();


    //recibe url para redireccion
    this.paymentServices.getDataUrl().subscribe({
      next: data =>{
      console.log('Url recibida: ',data)
      this.urlRedireccion = data;
      }
      });
  }


    public generarIdUnicoNumerico(): number {
    const timestamp = new Date().getTime();
    const sixDigitId = parseInt(timestamp.toString().slice(-6));
    return sixDigitId;
    }

    private getRandomArbitrary(min:number , max:number) {
    return Math.random() * (max - min) + min;
    }

 
//obtiene el user de localstorage
  getUser():void {
    this.user = this.utilservice.getFromLocalStorage(this.loginKey);
  }
//obtiene la region del array REGIONES(shared->constants)
  getRegionesArray():void {
    this.regiones = REGIONES.regiones.map(region => region.region);
  }
//se ejecuta al seleccionar region
  onSelectRegion():void {

    if(this.selectedRegion){
      this.userUpdate.region =  this.selectedRegion;

      const regionSeleccionada = REGIONES.regiones.find(r => r.region === this.selectedRegion);
      if (regionSeleccionada) {
        this.comunas = regionSeleccionada.comunas;
      } else {
        this.comunas = [];
      }
    }

  }

//se ejecuta al seleccionar comuna
  onSelectComuna():void {

    if(this.selectedComuna){
      this.userUpdate.commune =  this.selectedComuna;
    }

  }



//enviar formulario a la API
  onSubmit(form:any){


    //crear usuario para actualizar y verificar
    this.userUpdate.id = this.user.id;
    this.userUpdate.name = this.user.name;
    this.userUpdate.lastName = this.user.lastName;
    this.userUpdate.email = this.user.email;
    this.userUpdate.telephone = this.user.telephone;
    this.userUpdate.verify = true;
    //datos del formualario
    this.userUpdate.address = this.user.address;
    this.userUpdate.dIdentidad = this.user.dIdentidad;
    this.userUpdate.password = this.user.password;
    this.userUpdate.typeUser = this.user.typeUser;


     if(this.user.typeUser === 'user'){

      console.log(this.userUpdate);
        // update User way udapte user use services register
       // this.resgisterService.update(this.userUpdate);
       
        //SET USER A LOCAL SOTORAGE
       // this.utilservice.setToLocalStorage(this.loginKey, this.userUpdate);
        //REDIRECCION ENVIAR A LA URL de DONDE VINO
       //  this.utilservice.navigateToPath('/'+ this.urlRedireccion);
     }else{
      this.sweetUIService
      .alertConfirm("Atención", '¡No se pudo verificar; vuelva a intentarlo!', 'error')
     }
    
  }





}
