import { Component, OnInit } from '@angular/core';
import { Lender } from '../../models/lender.model';
import { REGIONES } from 'src/app/shared/constants/regiones.class';

@Component({
  selector: 'app-update-lender',
  templateUrl: './update-lender.component.html',
  styleUrls: ['./update-lender.component.css']
})
export class UpdateLenderComponent implements OnInit {
  public selectedRegion: string | null = null;
  public selectedComuna: string | null = null;
  public regiones: string[]=[];
  public comunas: string[]=[];
  public lender:Lender;

  constructor() {this.lender = new Lender; }

  ngOnInit(): void {
    this.getRegionesArray();
  }


  onSubmit(form:any){

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



}
