
import { User } from 'src/app/models/user.model';
import { ErrorRes } from 'src/app/shared/models/error.model';


export class loginPayload {
  email: string = '';
  password: string = '';
  typeUser: string = '';
}

export class loginResponse {
  token: string = '';
  user: User | null = null;
  success: boolean | null = null;
  Error: ErrorRes | null = null;
  message: string = '';
}

export class tokensDelUsuarioDto {
  idToken?: string;
  descripcion?: string;
}
