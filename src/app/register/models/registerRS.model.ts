import { ErrorRes } from "src/app/shared/models/error.model";
import { User } from "./user.model";

export class RegisterRS {
    token: string = '';
    data: any = null;
    success: boolean | null = null;
    Error: ErrorRes | null = null;
    message: string = '';
  }
