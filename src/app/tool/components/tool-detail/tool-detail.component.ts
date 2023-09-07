import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationExtras,Params, Router } from '@angular/router';
import { Tool, ToolResponse } from '../../models/tool.model';
import { FormControl } from '@angular/forms';
import { ToolServiceNew } from '../../providers/tool.service';
import { Category } from 'src/app/category/models/category.model';
import { Lender } from 'src/app/Lender/models/lender.model';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentServices } from 'src/app/payment/providers/payment.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.css'],
  providers:[ToolServiceNew]
})
export class ToolDetailComponent implements OnInit {
 
  

  public tool: ToolResponse;
  public id: number;
  public rating = new FormControl();
  public toolCat: any;
  public category: Category|null =null;
  public lender: Lender| null = null;
  public starRating: number;
  public url:any;
 


 public rating3: number;
 public form1: FormGroup;
 public form2: FormGroup;

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toolService: ToolServiceNew,
    private fb: FormBuilder,
    private paymentServices: PaymentServices,
  ){
    this.id = 0;
    this.tool = new ToolResponse ();//instancia vacia para guardar tool por id
    this.category= new Category();
    this.lender = new Lender();
    this.starRating = 5;

    this.rating3 = 0;

    this.form1 = this.fb.group({
      rating1: [0, Validators.required],
    })

    this.form2 = this.fb.group({
      rating2: [0, Validators.required]
    })
  }

  ngOnInit(): void {
    this.getToolDetail()//saca detalle de Tool por su ID
    this.getUrlSegment();//obtener path de la url para redireccion si entra en verify-user
  }


 //obtiene el ultimo segmento de la ruta
    getUrlSegment():void{
      //obtener la URL
      this.route.url.subscribe(params =>{
      this.url = params[0].path + '/' + params[1].path;
      this.paymentServices.setDataUrl(this.url); //envia url para redireccion
      })
    }

    

    getToolDetail(): void{
        //obtener el  id de la URL
        this.route.params.subscribe(params =>{
            this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero
            //obtiene la herramienta por id
            this.toolService.getDetailToolProviders(this.id).subscribe((response:ToolResponse)=>{
                this.tool = response
                //asignamos valor de rate tool a rating1
                this.form1 = this.fb.group({
                  rating1: [this.tool.rate, Validators.required]
                })
                //obtener categoria
                this.category = response.objetoCategoria;
                this.lender = response.objetoLender;
                //asignamos valor de rate lender a rating2
                this.form2 = this.fb.group({
                  rating2: [this.lender?.rate, Validators.required]
                })
            })

        });

    }





}


