export class User{
    constructor(
        public id:number,
        public name:string,
        public lastName:string,
        public password:string,
        public email:string,
        public telephone:string,
        public address:string,
        public dIdentidad: string,
        public date: Date,
        public verify:boolean,
        public typeUser:string
    ){}
}