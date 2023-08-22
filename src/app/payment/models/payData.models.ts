import { DetalleVenta } from "./details_venta";
import { Venta } from "./venta.models";

export class PayData {
  buyOrder: string = '';
  sessionId: string = '';
  amount: number = 0;
  returnUrl: string = '';
  ventum: Venta = new Venta();
  detalleVentum:DetalleVenta = new DetalleVenta();


}
