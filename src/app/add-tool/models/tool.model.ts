import { DecimalPipe } from "@angular/common";

export class Tool {
  id:number=0;
  name: string = '';
  reference: string = '';
  nuevo: string = '';
  model: string = '';
  description: string = '';
  widgets: string = '';
  valueComercial: number = 0;
  valueRent: number = 0;
  yearBuy: number = 0;
  weigt: number = 0;
  mesuare: number = 0;
  numberPiece: number = 0;
  urlImage: string = '';
  urlImage2: string = '';
  urlImage3: string = '';
  termsUse: string = '';
  breakDowns: string = '';
  timeUse: number = 0;
  idCategory: number = 0;
  idLenders: string = '';
  dateUp: Date = new Date();
  rate: number = 0;
}
