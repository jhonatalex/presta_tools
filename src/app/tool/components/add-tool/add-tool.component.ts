import { Component, OnInit } from '@angular/core';


import {  inject} from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { Tool } from '../../models/tool.model';

import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Category } from 'src/app/category/models/category.model';
import { CategoryService } from 'src/app/category/providers/category.service';
import { ToolServiceNew } from '../../providers/tool.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment.prod';
import { Constants } from 'src/app/shared/constants/settings.class';
import { User } from 'src/app/register/models/user.model';





@Component({
  selector: 'add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.css'],
  providers:[ToolServiceNew],

})

export class AddToolComponent implements OnInit {

  selectedFile1 : File | null = null;
  selectedFile2: File | null = null;
  selectedFile3: File | null = null;

  public url_image_1:string='';
  public  url_image_2:string='';
  public  url_image_3:string='';

  public user: User = new User();


  public tool!: Tool;
  categories: Category[] = [];
  selectedCategory: number | null = null;
  public defautlCategory:Category|null=null;

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;



  constructor( private toolService:ToolServiceNew,
               private categoryService: CategoryService,
               private utilService:UtilService
     ) {

      this.tool = new Tool();//instancia de usuario vacía para el formulario



      }


  ngOnInit(): void {

    this.loadCategories()

  }



  onFileSelected1(event: any) {
    this.selectedFile1 = event.target.files[0];
    console.log(event.target.files)
  }

  onFileSelected2(event: any) {
    this.selectedFile2 = event.target.files[0];

  }
  onFileSelected3(event: any) {
    this.selectedFile3 = event.target.files[0];

  }



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
        this.tool.urlImage = url1;
        this.tool.urlImage2 = url2;
        this.tool.urlImage3 = url3;



        if( this.user!=null){
          this.user = this.utilService.getFromLocalStorage(this.loginKey + 'D3V');
          this.tool.idLenders=this.user.email;
        }


        // Llamar al siguiente método para consumir el servicio
        console.log(this.tool);
        this.toolService.saveTool(this.tool);

      } catch (error) {
        // Manejar cualquier error que ocurra durante la carga de imágenes
        console.error("Error al cargar las imágenes:", error);
        // Puedes agregar alguna lógica de manejo de errores adicional si es necesario
      }
    }


  }

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



}


