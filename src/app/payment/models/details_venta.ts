export class DetalleVenta {
  idVenta: number=0;
  idTool: number=0;
  amount: number=0;
  date: string = new Date().toLocaleString();
  price: number=0;
  descuento: number=0;
  total: number=0;
  startDate: string = '';
  endDate: string = '';
  rentalDays: number=0;
  Token:string='';
  BuyOrder:string='';
  SessionId:string='';
  PaymentTypeCode:string='';
  InstallmentsAmount:number=0;
  InstallmentsNumber:number=0;

}

