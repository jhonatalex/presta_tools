export class User{
    constructor(
        public id:number,
        public name:string,
        public last_name:string,
        public password:string,
        public email:string,
        public telephone:string,
        public address:string,
        public d_identidad: string,
        public date: Date,
        public state:boolean
    ){}
}