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
  public selectedRegion: string | null = null;
  public selectedComuna: string | null = null;
  public regiones: string[] =[];
  public comunas: string[][]=[];
  public url:string='';

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
    this.getUrlSegment();
    this.getUser();
    this.getRegionesArray();
    this.getComunasArray();
  }



  //obtiene el ultimo segmento de la ruta
  getUrlSegment(){
    //obtener la URL
     this.route.url.subscribe(params =>{
     const url = params[0].path;
      console.log(url);
      return url;
     })
  }
//obtiene el user de localstorage
  getUser():void {
    this.user = this.utilservice.getFromLocalStorage(this.loginKey + 'D3V');
    console.log(this.user);
  }
//obtiene la region del array REGIONES(shared->constants)
  getRegionesArray():void {
    this.regiones = REGIONES.regiones.map(region => region.region);
    console.log(this.regiones);
  }
//obtiene las comunas
  getComunasArray():void {
    this.comunas = REGIONES.regiones.map(comunas =>comunas.comunas);
   
    console.log(this.comunas);
  }


//se ejecuta al seleccionar region
  onSelectRegion():void {
    // Aquí puedes acceder al valor seleccionado en la variable selectedRegion
    console.log('LA REGION seleccionada ES: ', this.selectedRegion);

    if(this.selectedRegion){
      this.user.region =  this.selectedRegion;
    }
    //selectedRegion
  }

//se ejecuta al seleccionar comuna
  onSelectComuna():void {
    // Aquí puedes acceder al valor seleccionado en la variable selectedComuna
    console.log('LA comuna seleccionada es : ', this.selectedComuna);

    if(this.selectedComuna){
      this.user.commune =  this.selectedComuna;
    }
    //selectedComuna
  }




//enviar formulario a la API
  onSubmit(form:any){

    //TODO
    //send to Lender to api BD insert lender use service lender
    // update User way udapte user use services register

    //REDIRECCION ENVIAR A LA URLE de DONDE VINO

  }


  


}
