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
  public url_image_1:string='';
  public url_image_2:string='';
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

  initCategoryForm():void {
    this.CategoryForm = this.formBuilder.group({
      idCat:           [this.id],
      titleCat:        [this.category.titleCat,Validators.required],
      descripCat:      [this.category.descripCat,Validators.required],
      urlImagen:       [this.category.urlImagen],
      urlImagenBanner: [this.category.urlImagenBanner]
    });
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

    async submitForm(form: { reset: () => void; }) {

      console.log('entro')
      console.log(this.CategoryForm)

      //if (this.CategoryForm.valid) {
  
        const categoryApi: Category = {
          idCat:           this.id,
          titleCat:        this.CategoryForm.value.titleCat,
          descripCat:      this.CategoryForm.value.descripCat,
          urlImagen:       this.CategoryForm.value.urlImagen,
          urlImagenBanner: this.CategoryForm.value.urlImagenBanner,
          tools: []
        };
  
          const promises = [
            this.categoryService.uploadFile(this.selectedFile1),
            this.categoryService.uploadFile(this.selectedFile2),
          ];
  
          try {
            // Esperar a que se completen todas las promesas de carga de imágenes
            const [url1, url2] = await Promise.all(promises);

            categoryApi.urlImagen = url1;
            categoryApi.urlImagenBanner = url2;
  
            console.log(categoryApi);
            this.categoryService.updateCategory(categoryApi);
  
          } catch (error) {
            // Manejar cualquier error que ocurra durante la carga de imágenes
            console.error("Error al cargar las imágenes:", error);
  
          }
        //}else{
        //  console.log('complete el formulario');
       // }
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

    

  



  



