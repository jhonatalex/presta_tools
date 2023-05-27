import { DecimalPipe } from "@angular/common";

export class Tool{
    constructor(
        public id:number,
        public name:string,
        public reference:string,
        public niw:string,
        public model:string,
        public description:string,
        public widgets:string,
        public value_comercial:number,
        public value_rent:number,
        public year_buy:number,
        public weigt:number,
        public mesuare:number,
        public number_piece:number,
        public url_image:string,
        public url_image_2:string,
        public url_image_3:string,
        public terms_use:string,
        public break_downs:string,
        public time_use:number,
        public id_category:number,
        public id_user:number,
        public id_lender:number,
        public date_up: Date
    ){}
}