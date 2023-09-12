import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/login/auth/auth.service';
import { User } from 'src/app/register/models/user.model';
import { Constants } from 'src/app/shared/constants/settings.class';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment.prod';
import { Lender } from '../../models/lender.model';
import { LenderService } from '../../providers/lender.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production? '' : 'D3V'
  }`;

  public user: User = new User();
  public lender: any;
  public email: string;
  public form1: FormGroup;
  
  constructor(
    private authService: AuthService,
    private utilService: UtilService,
    private lenderService: LenderService,
    private fb: FormBuilder,)
    {this.email = '';
    this.form1 = this.fb.group({
      rating1: [0, Validators.required],
    })}
 

  ngOnInit(): void {
    //obtener user al iniciar compente
    this.user = this.utilService.getFromLocalStorage(this.loginKey);
    this.email = this.user.email;
    //obtener lender por email
    this.getLender(this.email);
  }



  //cerrar sesión
  signOut(){
    this.authService.endSession();
  }

  getLender(data:string){
    this.lenderService.getLenderByEmail(data).subscribe(lender=>{
      console.log(lender);
      this.lender = lender;
       //asignamos valor de rate Lender a rating1
       this.form1 = this.fb.group({
        rating1: [this.lender.rate, Validators.required]
      })
    })
  }

}
