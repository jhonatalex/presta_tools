import { Component, IterableDiffers, OnInit } from '@angular/core';
import { Lender } from '../../models/lender.model';
import { REGIONES } from 'src/app/shared/constants/regiones.class';
import { User } from 'src/app/register/models/user.model';
import { UtilService } from 'src/app/shared/services/util.service';
import { LenderService } from '../../providers/lender.service';
import { Constants } from 'src/app/shared/constants/settings.class';
import { environment } from 'src/environments/environment.prod';
import { SweetUIService } from 'src/app/shared/services/gui.service';
import { BANKS } from 'src/app/shared/constants/bankList';

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
  public selectedBank: string | null = null;
  public selecteTypeCount: string | null = null;

  public regiones: string[]=[];
  public comunas: string[]=[];
  public banks: string[]=[];
  public typeCounts: string[]=[];

  public lender:Lender;
  public user: User;
  public email: string;

  constructor(
    private utilService: UtilService,
    private lenderService: LenderService,
    private sweetUIService:SweetUIService,
  )
    { this.lender = new Lender;
      this.user = new User;
      this.email = ''; }

    ngOnInit(): void {
      //obtener user al iniciar compente
      this.user = this.utilService.getFromLocalStorage(this.loginKey);
      this.email = this.user.email;
      //obtener lender por email
      this.getLender(this.email);
      this.getRegionesArray();
      this.getBanks();
      this.getTypeCount();
    }


    //busca lender en base de datos
    getLender(data:string){
      this.lenderService.getLenderByEmail(data).subscribe(Lender=>{
        this.lender = Lender;
      })
    }
    //obtiene la region del array REGIONES(shared->constants)
    getRegionesArray():void {
      this.regiones = REGIONES.regiones.map(region => region.region);
    }

    getBanks() {
      this.banks = BANKS.bank.map(item=>item.nombre)
    }

    getTypeCount() {
      this.typeCounts = BANKS.tipos_de_cuenta.map(item=>item.nombre);
    }


    onSelectBank():void {

      if(this.selectedBank){
        this.lender.bank= this.selectedBank;
      }

    }

    onSelectTypeCount():void {

      if(this.selecteTypeCount){
        this.lender.typeCount= this.selecteTypeCount;
      }

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
    this.lender.address = form.form.value.address;
    this.lender.commune = form.form.value.comuna;
    this.lender.numberBank = form.form.value.numberBank;
    this.lender.region = form.form.value.region;
    this.lender.telephone = form.form.value.telephone;

    //enviar lender actualizado
    if(this.lender){
      this.lenderService.updateLender(this.lender).subscribe(response=>{

        if (response=='Lender actualizado satisfactoriamente'){
          this.sweetUIService.alertConfirm("Atención", '¡Datos Actualizados correctamente; puede continuar!', 'success');
            //REDIRECCION ENVIAR A LA URL de DONDE VINO
          this.utilService.navigateToPath('/panel');

        } else{
          this.sweetUIService.alertConfirm("Atención", '¡No se pudo verificar; vuelva a intentarlo!', 'error');
          }
      });
    }

  }



}
