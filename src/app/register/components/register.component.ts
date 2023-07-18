import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../models/user.model';
import { RegisterService } from '../providers/register.service';
//import { v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public ConfirmPassword:string='';


  constructor(private userService: UserService,
              private resgisterService: RegisterService)
  {
   // const uniqueId:number = uuidv4();
    this.user = new User();//instancia de usuario vacía para el formulario
    this.user.id = this.generarIdUnicoNumerico();

   }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm):void{
    //let response = this.userService.post('/api/user/insert',this.user).subscribe(response=>{
     // console.log(response);
    //
    this.resgisterService.register(this.user);

  }


  public generarIdUnicoNumerico(): number {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const id = parseInt(timestamp.toString() + randomNum.toString());
    return id;
  }

  private getRandomArbitrary(min:number , max:number) {
    return Math.random() * (max - min) + min;
  }

}
