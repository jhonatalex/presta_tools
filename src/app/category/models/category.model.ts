import { Tool, ToolResponse } from "src/app/tool/models/tool.model";

export class Category{
    public idCat:number=0;
    public titleCat:string='';
    public descripCat:string='';
    public urlImagen:string='';
    public urlImagenBanner:string='';
    public tools: Array<ToolResponse> =[]

}
export class CategoryApi{
  public titleCat:string='';
  public descripCat:string='';
  public urlImagen:string='';
  public urlImagenBanner:string='';
}
