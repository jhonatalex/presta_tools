import { ErrorRes } from "src/app/shared/models/error.model";
import { Category } from "./category.model";

export class CategoryRS {
    token: string = '';
    lisCategory: Array<Category> =[];
    success: boolean | null = null;
    Error: ErrorRes | null = null;
    message: string = '';
  }
