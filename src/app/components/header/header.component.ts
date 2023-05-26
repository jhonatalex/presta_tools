import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input() flaglogo:boolean = true; //recibe bandera para reducir el tamaño del logo; inicializado en true para tamaño normal
  

  constructor() {}

  ngOnInit(): void {
    
  }

}
