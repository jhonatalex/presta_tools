import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  public user:User;

  constructor(private userService:UserService) { 
    this.user = new User(0,'','','','','','','',new Date(),true);
  }

  ngOnInit(): void {
    
  }

  onSubmit(form:NgForm){
    this.userService.signup(this.user).subscribe(response=>{
      console.log(response);
      this.userService.getIdentity();//saca indentidad de usuario logeado
    });
  }

}
