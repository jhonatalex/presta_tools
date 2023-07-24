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



  async onSubmit(form:NgForm):Promise<void>{

    if (this.selectedFile1 && this.selectedFile2 && this.selectedFile3) {
      const promises = [
        this.uploadFile(this.selectedFile1),
        this.uploadFile(this.selectedFile2),
        this.uploadFile(this.selectedFile3)
      ];

      try {
        // Esperar a que se completen todas las promesas de carga de imágenes
        const [url1, url2, url3] = await Promise.all(promises);

        // Asignar las URLs a las variables
        this.tool.urlImage = url1;
        this.tool.urlImage2 = url2;
        this.tool.urlImage3 = url3;



        if( this.user!=null){
          this.user = this.utilService.getFromLocalStorage(this.loginKey + 'D3V');
          this.tool.idLenders=this.user.email;
        }


        this.tool.id= this.generarIdUnicoNumerico();

        // Llamar al siguiente método para consumir el servicio
        console.log('SE FUE AL API');
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




  async uploadFile(selectedFile: File): Promise<string> {
    if (selectedFile) {
      const filePath = `imagenes/tool/${selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, selectedFile);

      // ACTIVA EL LOADER
      this.spinner.show();

      try {
        // Esperar a que se complete la carga del archivo
        const snapshot = await task.snapshotChanges().toPromise();

        if (snapshot?.state === 'success') {
          // La carga se completó con éxito

          // DESACTIVA EL LOADER
          this.spinner.hide();

          // Obtener la URL de descarga
          const url = await fileRef.getDownloadURL().toPromise();
          console.log('URL de descarga:', url);
          return url;
        } else {
          // Ocurrió un error durante la carga
          throw new Error('La carga del archivo falló');
        }
      } catch (error) {
        // Ocurrió un error durante la carga
        console.log('Error al cargar el archivo', error);
        throw error;
      }
    }

    return '';
  }

  public generarIdUnicoNumerico(): number {
    const timestamp = new Date().getTime();
    const sixDigitId = parseInt(timestamp.toString().slice(-6));
    return sixDigitId;
  }



}


