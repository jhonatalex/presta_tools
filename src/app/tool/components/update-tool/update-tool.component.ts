import { Component, OnInit } from '@angular/core';
import {  inject} from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { Tool, ToolResponse } from '../../models/tool.model';

import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Category } from 'src/app/category/models/category.model';
import { CategoryService } from 'src/app/category/providers/category.service';
import { ToolServiceNew } from '../../providers/tool.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment.prod';
import { Constants } from 'src/app/shared/constants/settings.class';
import { User } from 'src/app/register/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-tool',
  templateUrl: './update-tool.component.html',
  styleUrls: ['./update-tool.component.css'],
  providers:[ToolServiceNew],
})
export class UpdateToolComponent implements OnInit{

  selectedFile1 : File | null = null;
  selectedFile2: File | null = null;
  selectedFile3: File | null = null;

  selectedFileName: string | undefined;

  public url_image_1:string='';
  public  url_image_2:string='';
  public  url_image_3:string='';

  public user: User = new User();


  public toolUpdate!: Tool;
  public tool:ToolResponse;
  categories: Category[] = [];
  selectedCategory: number | null = null;
  public defautlCategory:Category|null=null;

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;



  constructor( private toolService:ToolServiceNew,
               private categoryService: CategoryService,
               private utilService:UtilService,
               private router:ActivatedRoute
     ) {this.toolUpdate = new Tool();
        this.tool = new ToolResponse();}


  ngOnInit(): void {

    this.loadCategories();
    this.getToolById();
  }

  //busca tool por id en la api
  getToolById(){
      this.router.params.subscribe(params=>{
          const idTool= +params['id'];
              this.toolService.getDetailToolProviders(idTool).subscribe(Tool=>{
                this.tool = Tool;
              })   
      })
  }

  //obtiene todas las categorias
  loadCategories() {
    this.categoryService.getListCategoryProviders().subscribe(
      (categories: Category[]) => {

        this.defautlCategory = new Category();
        this.defautlCategory.titleCat="Seleccione una categoría"

        this.categories = categories;

      },
      (error) => {
        console.log(error);
      }
    );
  }

   // Método que se ejecuta cuando se selecciona una categoría
   onSelectCategory() {
    // Aquí puedes acceder al valor seleccionado en la variable selectedCategory
    console.log('Categoría seleccionada:', this.selectedCategory);

    if(this.selectedCategory){
      this.tool.idCategory =  Number(this.selectedCategory);
    }

  }

  public generarIdUnicoNumerico(): number {
    const timestamp = new Date().getTime();
    const sixDigitId = parseInt(timestamp.toString().slice(-6));
    return sixDigitId;
  }

  onFileSelected1(event: any) {

    const file = event.target.files[0];
    if (file) {
        this.selectedFileName = file.name;
        this.selectedFile1 = event.target.files[0];
        // También puedes realizar otras acciones con el archivo aquí, como cargarlo o mostrar una vista previa.
    } else {
        this.selectedFileName = undefined;
    }

  }

  onFileSelected2(event: any) {
    this.selectedFile2 = event.target.files[0];

  }
  onFileSelected3(event: any) {
    this.selectedFile3 = event.target.files[0];

  }
  //metodo para actualizar en la api
  async onSubmit(form:NgForm):Promise<void>{

    if (this.selectedFile1 && this.selectedFile2 && this.selectedFile3) {
      const promises = [
        this. toolService.uploadFile(this.selectedFile1),
        this. toolService.uploadFile(this.selectedFile2),
        this. toolService.uploadFile(this.selectedFile3)
      ];

      try {
        // Esperar a que se completen todas las promesas de carga de imágenes
       const [url1, url2, url3] = await Promise.all(promises);

         //Asignar las URLs a las variables
        this.toolUpdate.urlImage = url1;
        this.toolUpdate.urlImage2 = url2;
        this.toolUpdate.urlImage3 = url3;
        this.toolUpdate.id = this.tool.id;      
        this.toolUpdate.name = this.tool.name;        
        this.toolUpdate.reference = this.tool.reference;     
        this.toolUpdate.newItem = this.tool.newItem;              
        this.toolUpdate.model = this.tool.model;                
        this.toolUpdate.description = this.tool.description;        
        this.toolUpdate.widgets = this.tool.widgets;        
        this.toolUpdate.valueCommercial = this.tool.valueCommercial;     
        this.toolUpdate.valueRent = this.tool.valueRent;        
        this.toolUpdate.yearBuy = this.tool.yearBuy;                
        this.toolUpdate.weigt = this.tool.weigt;                 
        this.toolUpdate.mesuare = this.tool.mesuare;               
        this.toolUpdate.numberPiece = this.tool.numberPiece;                   
        this.toolUpdate.termsUse = this.tool.termsUse;                     
        this.toolUpdate.breakDowns = this.tool.breakDowns;                     
        this.toolUpdate.timeUse = this.tool.timeUse;      
        this.toolUpdate.idCategory = this.tool.idCategory;                 
        this.toolUpdate.idLenders = this.tool.idLenders;        
        this.toolUpdate.dateUp = this.tool.dateUp;  
        this.toolUpdate.rate = this.tool.rate;            
        this.toolUpdate.brand = this.tool.brand;          
        this.toolUpdate.state = this.tool.state;        



        if( this.user!=null){
          this.user = this.utilService.getFromLocalStorage(this.loginKey);
          this.tool.idLenders=this.user.email;
        }


        // Llamar al siguiente método para consumir el servicio
        this.toolService.updateTool(this.toolUpdate);

      } catch (error) {
        // Manejar cualquier error que ocurra durante la carga de imágenes
        console.error("Error al cargar las imágenes:", error);
        // Puedes agregar alguna lógica de manejo de errores adicional si es necesario
      }
    }


  }





}


