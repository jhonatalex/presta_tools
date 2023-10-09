import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/login/auth/auth.service';
import { User } from 'src/app/register/models/user.model';
import { Constants } from 'src/app/shared/constants/settings.class';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment.prod';
import { Lender } from '../../models/lender.model';
import { LenderService } from '../../providers/lender.service';
import { Tool, ToolResponse } from 'src/app/tool/models/tool.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production? '' : 'D3V'
  }`;

  public user: User;
  public lender: Lender;
  public email: string;
  public form1: FormGroup;
  public form2: FormGroup;

  public tools:ToolResponse[]=[];
  
    constructor(
      private authService: AuthService,
      private utilService: UtilService,
      private lenderService: LenderService,
      private fb: FormBuilder
    )

    { this.email = '';
      this.form1 = this.fb.group({
        rating1: [0, Validators.required]
      });
      this.form2 = this.fb.group({
        rating2: [4, Validators.required]
      });
      this.lender = new Lender;
      this.user = new User;
    }
 

  ngOnInit(): void {
    //obtener user al iniciar compente
    this.user = this.utilService.getFromLocalStorage(this.loginKey);
    this.email = this.user.email;
    //obtener lender por email
    this.getLender(this.email);
  }
  //cerrar sesión
  signOut(){
    this.authService.endSession2();
  }
  //busca lender en base de datos
  getLender(data:string){
    this.lenderService.getLenderByEmail(data).subscribe(Lender=>{
       this.lender = Lender;
       this.tools = this.lender.tools;
       console.log(this.lender)
       //asignamos valor de rate Lender a rating1
       this.form1 = this.fb.group({
        rating1: [this.lender.rate, Validators.required]
       });
    }); 
  }
  //borrar producto
  deleteTool(toolId: number) {
    this.lenderService.deleteToolById(toolId);
  }


  

 

}
