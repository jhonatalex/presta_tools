export class User {
    id: number =0;
    name: string = '';
    lastName: string = '';
    password: string = '';
    email: string = '';
    telephone: string = '';
    address: string = '';
    dIdentidad: string = '';
    date: string = new Date().toLocaleString();
    verify: boolean = false;
    region:string='';
    commune:string='';
    rate:number=0;
    typeUser: string = '';
    venta:[]=[]

}


