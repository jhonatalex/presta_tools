import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/auth/auth.service';
import { User } from 'src/app/register/models/user.model';
import { Constants } from 'src/app/shared/constants/settings.class';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;

  @Input() flaglogo:boolean = true; //recibe bandera para reducir el tamaño del logo; inicializado en true para tamaño normal

  public user: User = new User();
  constructor(
    private utilService: UtilService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
      this.user = this.utilService.getFromLocalStorage(this.loginKey);
  }

  signOut(){
    this.authService.endSession();
  }

}
