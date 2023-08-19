export class Lender{

  public id:number =0;
  public dIdentidad: string='';
  public name:string='';
  public lastName:string='';
  public password:string='';
  public email:string='';
  public telephone:string='';
  public address:string='';
  public numberBank:string='';
  public region:string='';
  public commune:string='';
  public balanceWallet:string='';
  public dateUp: string = new Date().toISOString();
  public rate: number = 0;
}
