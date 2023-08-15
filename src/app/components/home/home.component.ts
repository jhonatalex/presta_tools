import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category/models/category.model';
import { UtilService } from 'src/app/shared/services/util.service';
import { Constants } from 'src/app/shared/constants/settings.class';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/app/register/models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[]
})
export class HomeComponent implements OnInit {
  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production? 'D3V' : 'D3V'
  }`;



  public categories:any;
  public user: User = new User();
  constructor(
    private utilService: UtilService,
  ){}

  ngOnInit(): void {
    //this.getCategories();//ejecuta funcion al iniciar y obtiene las categorias

    /*this.categoryService.editTool().subscribe(response=>{
      console.log(response);
    });*/
    this.user = this.utilService.getFromLocalStorage(this.loginKey);
  }











}
