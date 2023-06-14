import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public titulo='Login'

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){

  }

}
