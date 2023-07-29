import { Component, OnInit } from '@angular/core';


import {  inject} from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { ToolService } from 'src/app/services/tool.service';
import { Tool } from '../models/tool.model';

import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Category } from 'src/app/category/models/category.model';
import { CategoryService } from 'src/app/category/providers/category.service';
import { ToolServiceNew } from '../providers/tool.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment.prod';
import { Constants } from 'src/app/shared/constants/settings.class';





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


  public tool!: Tool;
  categories: Category[] = [];
  selectedCategory: number | null = null;

  private loginKey = `${new Constants().getStorageKeys().loginTokenKey}${
    environment.production ? '' : 'D3V'
  }`;



  constructor( private toolService:ToolServiceNew,
               private spinner: NgxSpinnerService,
               private storage: AngularFireStorage,
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



  onSubmit(form:NgForm):void{
    this.tool.id= this.utilService.getFromLocalStorage(this.loginKey + 'D3V').email;
    console.log(this.tool.id);
    
    if (this.selectedFile1 && this.selectedFile2 && this.selectedFile3 ) {

      this.url_image_1 = this.uploadFile(this.selectedFile1);
      this.url_image_2 = this.uploadFile(this.selectedFile2);
      this.url_image_3 = this.uploadFile(this.selectedFile2);

    }

    if (this.url_image_1 && this.url_image_2 && this.url_image_3 ) {

      this.tool.urlImage = this.url_image_1;
      this.tool.urlImage2 = this.url_image_2;
      this.tool.urlImage3 = this.url_image_3;

    }
    console.log(this.tool)
      this.toolService.saveTool(this.tool);


  }

  loadCategories() {
    this.categoryService.getListCategoryProviders().subscribe(
      (categories: Category[]) => {
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
      this.tool.idCategory=this.selectedCategory;
    }

  }




  uploadFile(selectedFile:File):string {

    if (selectedFile) {

      const filePath = `imagenes/tool/${selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath,selectedFile);

      //ACTIVA EL LOADER
      this.spinner.show();

      task.snapshotChanges().subscribe(
        (snapshot) => {

          if (snapshot?.state === 'success') {
            // La carga se completó con éxito

            //DESACTIVA EL LOADER
            this.spinner.hide()
            fileRef.getDownloadURL().subscribe(
              (url) => {
                console.log('URL de descarga:', url);
                return url;
                console.log('URL de descarga:', url);
                // Realiza las acciones necesarias con la URL, como guardarla en la base de datos, etc.
              },
              (error) => {
                console.log('Error al obtener la URL de descarga', error);
              }
            );
          }
        },
        (error:any) => {
          // Ocurrió un error durante la carga
          console.log('Error al cargar el archivo', error);
        }
      );
    }

    return '';
  }





}


