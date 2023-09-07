import { Component, OnInit } from '@angular/core';
import { PaymentServices } from 'src/app/payment/providers/payment.service';
import { User } from 'src/app/register/models/user.model';
import { REGIONES } from 'src/app/shared/constants/regiones.class';
import { Constants } from 'src/app/shared/constants/settings.class';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment.prod';
import { Lender } from '../../models/lender.model';
import { LenderService } from '../../providers/lender.service';

@Component({
  selector: 'app-verify-lender',
  templateUrl: './verify-lender.component.html',
  styleUrls: ['./verify-lender.component.css']
})
export class VerifyLenderComponent implements OnInit {
  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  public user: User;
  public ConfirmPassword:string='';
  public token:string='';
  public lender:Lender;
  public selectedRegion: string | null = null;
  public selectedComuna: string | null = null;
  public regiones: string[]=[];
  public comunas: string[]=[];
  public urlRedireccion: any;
  constructor(
    private utilservice: UtilService,
    private lenderService: LenderService,
    private sweetUIService:SweetUIService,
    private paymentServices: PaymentServices) 

    {this.user  = new User;
    this.lender = new Lender;   
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
      this.lender.region= this.selectedRegion;

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
      this.lender.commune = this.selectedComuna;
    }

  }


  //enviar formulario a la API
  onSubmit(Form:any){
      //crear lender para registrarlo si va a alquilar producto
      this.lender.id = this.generarIdUnicoNumerico();
      this.lender.password = this.user.password;
      //datos recogidos del formulario
      this.lender.address = this.user.address;
      this.lender.dIdentidad = this.user.dIdentidad;
      this.lender.name = this.user.name;
      this.lender.lastName = this.user.lastName;
      this.lender.telephone = this.user.telephone;
      this.lender.email = this.user.email;



      

      
     if(this.user.typeUser === 'user'){
      // Enviar Lender a la api
      // this.lenderService.register(this.lender);
     console.log(this.lender)
      //REDIRECCION ENVIAR A LA URL de DONDE VINO
     //  this.utilservice.navigateToPath('/'+ this.urlRedireccion);
   }else{
    this.sweetUIService
    .alertConfirm("Atención", '¡No se pudo verificar; vuelva a intentarlo!', 'error')
   }
  }

}
