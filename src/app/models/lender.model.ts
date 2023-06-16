export class User{
    constructor(
        public id:number,
        public d_identidad: string,
        public name:string,
        public last_name:string,
        public password:string,
        public email:string,
        public telephone:string,
        public address:string,
        public number_bank:string,
        public balance_wallet:string,
        public date_up: Date
    ){}
}