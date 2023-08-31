export class DetalleVenta {
  idVenta: number=0;
  idTool: number=0;
  amount: number=0;
  date: string = new Date().toISOString();
  price: number=0;
  descuento: number=0;
  total: number=0;
  startDate: string = '';
  endDate: string = '';
  rentalDays: number=0;
  Token:string='';
  BuyOrder:string='';
  SessionId:string='';
  PaymentTypeCode='';
}

