import { Component, OnInit } from '@angular/core';
import { Lender } from '../../models/lender.model';
import { REGIONES } from 'src/app/shared/constants/regiones.class';
import { User } from 'src/app/register/models/user.model';
import { UtilService } from 'src/app/shared/services/util.service';
import { LenderService } from '../../providers/lender.service';
import { Constants } from 'src/app/shared/constants/settings.class';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-update-lender',
  templateUrl: './update-lender.component.html',
  styleUrls: ['./update-lender.component.css']
})
export class UpdateLenderComponent implements OnInit {
  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production? '' : 'D3V'
  }`;

  public selectedRegion: string | null = null;
  public selectedComuna: string | null = null;
  public regiones: string[]=[];
  public comunas: string[]=[];
  public lender:Lender;
  public user: User = new User();
  public email: string;

  constructor(
    private utilService: UtilService,
    private lenderService: LenderService,) 
    {this.lender = new Lender;
      this.email = ''; }

  ngOnInit(): void {
    //obtener user al iniciar compente
    this.user = this.utilService.getFromLocalStorage(this.loginKey);
    this.email = this.user.email;
    //obtener lender por email
    this.getLender(this.email);
    this.getRegionesArray();
  }
   

    getLender(data:string){
      this.lenderService.getLenderByEmail(data).subscribe(lender=>{
        console.log(lender);
        this.lender = lender;
        
      })

    }

    //obtiene la region del array REGIONES(shared->constants)
    getRegionesArray():void {
      this.regiones = REGIONES.regiones.map(region => region.region);
    }
  //se ejecuta al seleccionar region
  onSelectRegion():void {

    if(this.selectedRegion){
      this.lender.region= this.selectedRegion;//asigna region a lender
      

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

  onSubmit(form:any){

  }



}
