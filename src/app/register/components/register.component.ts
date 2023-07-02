import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public ConfirmPassword:string='';
  

  constructor(private userService: UserService) 
  {
    this.user = new User(0,'','','','','','','',new Date,true,'');//instancia de usuario vacía para el formulario
   }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm):void{
    let response = this.userService.post('/api/user/insert',this.user).subscribe(response=>{
      console.log(response);
    })
    
  }

}
