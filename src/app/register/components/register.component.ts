import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';


import { User } from '../models/user.model';
import { RegisterService } from '../providers/register.service';

//import { v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public ConfirmPassword:string='';


  constructor( private resgisterService: RegisterService)
  {
   // const uniqueId:number = uuidv4();
    this.user = new User();//instancia de usuario vacía para el formulario


   }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm):void{
    this.user.id = this.generarIdUnicoNumerico();
    console.log(this.user)
    this.resgisterService.register(this.user);
  }


  public generarIdUnicoNumerico(): number {
    const timestamp = new Date().getTime();
    const sixDigitId = parseInt(timestamp.toString().slice(-6));
    return sixDigitId;
  }

  private getRandomArbitrary(min:number , max:number) {
    return Math.random() * (max - min) + min;
  }

}
