import { ErrorRes } from "src/app/shared/models/error.model";
import { Lender } from "./lender.model";


export class LenderRS {
    token: string = '';
    data: null = null;
    success: boolean | null = null;
    Error: ErrorRes | null = null;
    message: string = '';
  }


 