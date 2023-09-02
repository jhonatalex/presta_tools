import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  @Input() urlDeVenida:string = '';

  public user: User;
  public token:string='';
  public userUpdate: UserUpdate;
  public lender:Lender;
  public selectedRegion: string | null = null;
  public selectedComuna: string | null = null;
  public regiones: string[]=[];
  public comunas: string[]=[];
  public ConfirmPassword:string='';
  

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  
  constructor(
    private route: ActivatedRoute,
    private toolService: ToolServiceNew,
    private utilservice: UtilService,
    private resgisterService: RegisterService,
    private lenderService: LenderService,
    private sweetUIService:SweetUIService,
  ) {

   this.user  = new User;
   this.userUpdate = new UserUpdate;
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

    this.userUpdate.id = this.user.id;
    this.userUpdate.name = this.user.name;
    this.userUpdate.lastName = this.user.lastName;
    this.userUpdate.email = this.user.email;
    this.userUpdate.telephone = this.user.telephone;
  }
//obtiene la region del array REGIONES(shared->constants)
  getRegionesArray():void {
    this.regiones = REGIONES.regiones.map(region => region.region);
  }


//se ejecuta al seleccionar region
  onSelectRegion():void {

    if(this.selectedRegion){
      this.userUpdate.region =  this.selectedRegion;
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
      this.userUpdate.commune =  this.selectedComuna;
      this.lender.commune = this.selectedComuna;
    }

  }



//enviar formulario a la API
  onSubmit(form:any){
    
    //se verifica el user
    this.userUpdate.verify = true;
    //datos del formualario
    this.userUpdate.address = this.user.address;
    this.userUpdate.dIdentidad = this.user.dIdentidad;
    this.userUpdate.password = this.user.password;

    this.lender.id = this.generarIdUnicoNumerico();
    this.lender.password = this.user.password;
    //datos recogidos del formulario
    this.lender.address = this.user.address;
    this.lender.dIdentidad = this.user.dIdentidad;
    this.lender.name = this.user.name;
    this.lender.lastName = this.user.lastName;
    this.lender.telephone = this.user.telephone;
    this.lender.email = this.user.email;
   

     if(this.userUpdate.region){
        // update User way udapte user use services register
        this.resgisterService.update(this.userUpdate);
        //send to Lender to api BD insert lender use service lender
        this.lenderService.register(this.lender);
        //SET USER A LOCAL SOTORAGE
        this.utilservice.setToLocalStorage(this.loginKey +'D3V', this.userUpdate);
        //REDIRECCION ENVIAR A LA URL de DONDE VINO
        // this.utilservice.navigateToPath('/producto/this.id');
     }else{
      this.sweetUIService
      .alertConfirm("Atención", '¡No se pudo verificar; vuelva a intentarlo!', 'error')
     }
    
  }





}
