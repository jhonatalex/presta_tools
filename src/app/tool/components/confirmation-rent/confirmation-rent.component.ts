import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { User } from 'src/app/register/models/user.model';
import { Constants } from 'src/app/shared/constants/settings.class';
import { UtilService } from 'src/app/shared/services/util.service';
import { Tool, ToolResponse } from 'src/app/tool/models/tool.model';
import { environment } from 'src/environments/environment.prod';
import { ToolServiceNew } from '../../providers/tool.service';


@Component({
  selector: 'app-confirmation-rent',
  templateUrl: './confirmation-rent.component.html',
  styleUrls: ['./confirmation-rent.component.css'],
  providers:[ToolServiceNew]
})
export class ConfirmationRentComponent implements OnInit {
  public id:number;
  public tool:ToolResponse;
  public startDate: Date = new Date();
  public endDate: Date = new Date();
  public days:number=0;
  public total:number=0;
  public nameLender: string | undefined;
  public lastNameLender: string|undefined;
  public user: User= new User;

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolServiceNew,
    private utilservice: UtilService

  ) {this.id = 0;
    this.tool = new ToolResponse();//instancia vacia para guardar tool por id
    }

  ngOnInit(): void {
    this.getToolDetail();
    this.getUser();
  }



    setInitialDate(event:any):void{
      this.startDate = event.target.value;
    } 

    setEndDate(event:any){
      this.endDate = event.target.value;
    
      const initialDate = new Date (this.startDate);
      const finalDate = new Date(this.endDate);
      let c= initialDate;
      const dates = [];

      while(c <= finalDate){
        dates.push(new Date(c))
        c.setDate(c.getDate()+1)
      }
      this.days = dates.length-1;
      this.total = this.days * this.tool.valueRent;
    
    }

 
      getUser():void{
        this.user= this.utilservice.getFromLocalStorage(this.loginKey + 'D3V');

      }




  getToolDetail(): void{
    //obtener el  id de la URL
    this.route.params.subscribe(params =>{
         this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero

          this.toolService.getDetailToolProviders(this.id).subscribe((response:ToolResponse)=>{
          this.tool = response
          this.nameLender = response.objetoLender?.name;
          this.lastNameLender = response.objetoLender?.lastName;
          })

    });
  }




  onSubmit(Form:NgForm){

  }




}
