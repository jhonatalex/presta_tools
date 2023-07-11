export class User{
    constructor(
        public id:number,
        public dIdentidad: string,
        public name:string,
        public lastName:string,
        public password:string,
        public email:string,
        public telephone:string,
        public address:string,
        public numberBank:string,
        public balanceWallet:string,
        public dateUp: Date,
        public state:boolean
    ){}
}