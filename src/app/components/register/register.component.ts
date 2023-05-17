import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  public titulo:string;
  public user:User;
  

  constructor(
    private userService: UserService
  ) {
    this.titulo = 'Register'
    this.user = new User(0,'','','','','','');//instancia de usuario vacía para el formulario
   }

  ngOnInit(): void {
  }

  onSubmit(form:any):void{
    this.userService.registerUser(this.user);//llama funcion register dentro del servicio
    form.reset();//limpia el formulario de registro
  }

}
