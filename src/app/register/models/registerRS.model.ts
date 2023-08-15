import { ErrorRes } from "src/app/shared/models/error.model";
import { User } from "./user.model";

export class RegisterRS {
    token: string = '';
    user: User | null = null;
    success: boolean | null = null;
    Error: ErrorRes | null = null;
    message: string = '';
  }