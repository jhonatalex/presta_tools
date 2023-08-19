import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/register/models/user.model';
import { RegisterService } from 'src/app/register/providers/register.service';
import { REGIONES } from 'src/app/shared/constants/regiones.class';
import { Constants } from 'src/app/shared/constants/settings.class';
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

  @Input() urlDeVenida:string = '';

  public user: User;
  public lender:Lender;
  public selectedRegion: string | null = null;
  public selectedComuna: string | null = null;
  public regiones: string[]=[];
  public comunas: string[]=[];
  

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;


  constructor(
    private route: ActivatedRoute,
    private toolService: ToolServiceNew,
    private utilservice: UtilService,
    private resgisterService: RegisterService,
    private lenderService: LenderService
  ) {

   this.user  = new User;
    this.lender = new Lender;
  }

  ngOnInit(): void {
    //CAPTURA LA URL DE VENIDA
    this.getUser();
    this.getRegionesArray();
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
    this.user = this.utilservice.getFromLocalStorage(this.loginKey + 'D3V');
   
    this.lender.name = this.user.name;
    this.lender.lastName = this.user.lastName;
    this.lender.telephone = this.user.telephone;
    this.lender.email = this.user.email;
    this.lender.password = this.user.password;
  }
//obtiene la region del array REGIONES(shared->constants)
  getRegionesArray():void {
    this.regiones = REGIONES.regiones.map(region => region.region);
  }


//se ejecuta al seleccionar region
  onSelectRegion():void {

    if(this.selectedRegion){
      this.user.region =  this.selectedRegion;
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
      this.user.commune =  this.selectedComuna;
      this.lender.commune = this.selectedComuna;
    }

  }



//enviar formulario a la API
  onSubmit(form:any){
    //TODO
    
    this.lender.id = this.generarIdUnicoNumerico();
    this.user.verify = true;
    this.lender.address = form.value.address;
     // update User way udapte user use services register
     this.resgisterService.update(this.user);
    //send to Lender to api BD insert lender use service lender
    this.lenderService.register(this.lender);
    //SET USER A LOCAL SOTORAGE
    this.utilservice.setToLocalStorage(this.loginKey +'D3V', this.user);

    //REDIRECCION ENVIAR A LA URLE de DONDE VINO
   // this.utilservice.navigateToPath('/producto/');
  }





}
