import { ErrorRes } from "./error.model";



export class ResponseApi<T = null> {
  token: string = '';
  data: T = null! as T;
  success: boolean | null = null;
  Error: ErrorRes | null = null;
  message: string = '';
}
