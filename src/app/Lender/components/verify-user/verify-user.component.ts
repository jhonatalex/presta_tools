import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/register/models/user.model';
import { REGIONES } from 'src/app/shared/constants/regiones.class';
import { Constants } from 'src/app/shared/constants/settings.class';
import { UtilService } from 'src/app/shared/services/util.service';
import { ToolServiceNew } from 'src/app/tool/providers/tool.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  public user: User;
  selectedRegion: string | null = null;
  public regiones: string[] =[];

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;


  constructor(
    private route: ActivatedRoute,
    private toolService: ToolServiceNew,
    private utilservice: UtilService

  ) {

   this.user  = new User;

  }

  ngOnInit(): void {

    //CAPTURA LA URL DE VENIDA



    this.getUser();
    this.getRegionesArray()

  }

  onSubmit(form:any){

    //TODO
    //send to Lender to api BD insert lender use service lender
    // update User way udapte user use services register



    //REDIRECCION ENVIAR A LA URLE DONDE VINO

  }


  getUser():void{
    this.user= this.utilservice.getFromLocalStorage(this.loginKey + 'D3V');

  }


  onSelectRegion() {
    // Aquí puedes acceder al valor seleccionado en la variable selectedCategory
    console.log('LA REGION ES', this.selectedRegion);


    if(this.selectedRegion){
      this.user.region =  this.selectedRegion;
    }


    //selectedRegion


  }

  onSelectComuna() {
    // Aquí puedes acceder al valor seleccionado en la variable selectedCategory
    console.log('LA comuan es ', this.selectedRegion);


    if(this.selectedRegion){
      this.user.commune =  this.selectedRegion;
    }


    //selectedRegion


  }


  getRegionesArray(){


    this.regiones = REGIONES.regiones.map(region => region.region);




  }



}
