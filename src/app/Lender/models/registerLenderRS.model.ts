import { ErrorRes } from "src/app/shared/models/error.model";
import { Lender } from "./lender.model";


export class RegisterLenderRS {
    token: string = '';
    data: Lender | null = null;
    success: boolean | null = null;
    Error: ErrorRes | null = null;
    message: string = '';
  }


 