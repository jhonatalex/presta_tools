export class User{
    constructor(
        public id:number,
        public nombre:string,
        public apellido:string,
        public telefono:string,
        public email:string,
        public password:string,
        public repeatPasword:string
    ){}
}