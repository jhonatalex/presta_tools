import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Params, } from '@angular/router';
import { async } from 'rxjs';
import { Category, CategoryApi } from '../../models/category.model';
import { CategoryService } from '../../providers/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  public CategoryForm: any
  selectedFile1!: File;
  selectedFile2!: File;
  public category: Category= new Category;
  public id:number=0;


  constructor(
        private formBuilder: FormBuilder,
        private categoryService:CategoryService,
        private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.loadCategoryById();
    this.initCategoryForm();
  }

    loadCategoryById():void {
      //obtener el  id de la URL
      this.route.params.subscribe(params =>{
        this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero
        //obtiene la herramienta por id
        this.categoryService.getDetailCategoryProviders(this.id).subscribe(
          (category: Category) => {
            this.category = category;
          },
          (error) => {
            console.log(error);
          },
          );

      });
    }

    initCategoryForm():void {
      this.CategoryForm = this.formBuilder.group({
        idCat:           [this.id],
        titleCat:        [''],
        descripCat:      [''],
        urlImagen:       [''],
        urlImagenBanner: ['']
      });
    }





    async submitForm(form: { reset: () => void; }) {

      console.log('entro')
      
        const categoryApi: Category = {
          idCat:           this.id, Validators.required,
          titleCat:        this.CategoryForm.value.titleCat,Validators.required
          descripCat:      this.CategoryForm.value.descripCat,
          urlImagen:       '',
          urlImagenBanner: '',
          tools: []
        };
       

        if (this.selectedFile1){

          const promises = [
            this.categoryService.uploadFile(this.selectedFile1),
          //  this.categoryService.uploadFile(this.selectedFile2),
          ];
  
          try {
            // Esperar a que se completen todas las promesas de carga de imágenes
            const [url1] = await Promise.all(promises);

            categoryApi.urlImagen=url1;
            categoryApi.urlImagenBanner = this.category.urlImagenBanner;
           
            
            console.log(categoryApi);
            this.categoryService.updateCategory(categoryApi);
  
          } catch (error) {
            // Manejar cualquier error que ocurra durante la carga de imágenes
            console.error("Error al cargar las imágenes:", error);
  
          }
        }else if(this.selectedFile2){

          const promises = [
            //this.categoryService.uploadFile(this.selectedFile1),
            this.categoryService.uploadFile(this.selectedFile2),
          ];
  
          try {
            // Esperar a que se completen todas las promesas de carga de imágenes
            const [url2] = await Promise.all(promises);

            categoryApi.urlImagen = this.category.urlImagen;
            categoryApi.urlImagenBanner = url2;
           
            
            console.log(categoryApi);
            this.categoryService.updateCategory(categoryApi);
  
          } catch (error) {
            // Manejar cualquier error que ocurra durante la carga de imágenes
            console.error("Error al cargar las imágenes:", error);
  
          }
         
        }else{
          categoryApi.urlImagen = this.category.urlImagen;
          categoryApi.urlImagenBanner = this.category.urlImagenBanner;
          console.log(categoryApi);
          this.categoryService.updateCategory(categoryApi);
        }
          
         
    }
  


    onFileSelected1(event: any) {
      this.selectedFile1 = event.target.files[0];
      console.log(event.target.files)
    }
    onFileSelected2(event: any) {
      this.selectedFile2 = event.target.files[0];
      console.log(event.target.files)
    }
  
    
  
}

    

  



  



