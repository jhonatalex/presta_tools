import { DecimalPipe } from "@angular/common";

export class Tool{
    constructor(
        public id:number,
        public name:string,
        public reference:string,
        public nuevo:string,
        public model:string,
        public description:string,
        public widgets:string,
        public valueComercial:number,
        public valueRent:number,
        public yearBuy:number,
        public weigt:number,
        public mesuare:number,
        public numberPiece:number,
        public urlImage:string,
        public urlImage2:string,
        public urlImage3:string,
        public termsUse:string,
        public breakDowns:string,
        public timeUse:number,
        public idCategory:number, 
        public idLenders:number,
        public dateUp: Date,
        public rate:number
    ){}
}