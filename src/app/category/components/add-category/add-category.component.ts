import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../providers/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: any;
  selectedFile1 : File | null = null;
  selectedFile2: File | null = null;
  public url_image_1:string='';
  public  url_image_2:string='';


  constructor(
        private formBuilder: FormBuilder,
        private categoryService:CategoryService,
    ) { }

  ngOnInit() {
    this.initCategoryForm();
  }

  initCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      titleCat: ['', Validators.required],
      descripCat: ['', Validators.required],

    });
  }

  async submitForm() {

    console.log('entro')

    console.log(this.categoryForm.valid)

    if (this.categoryForm.valid) {

      const category: Category = {
        idCat:0,
        titleCat: this.categoryForm.value.titleCat,
        descripCat: this.categoryForm.value.descripCat,
        urlImagen: '',
        urlImagenBanner:''
      };



      if (this.selectedFile1 && this.selectedFile2) {
        const promises = [
          this. categoryService.uploadFile(this.selectedFile1),
          this. categoryService.uploadFile(this.selectedFile2),

        ];

        try {
          // Esperar a que se completen todas las promesas de carga de imágenes
          const [url1, url2, url3] = await Promise.all(promises);


          category.urlImagen = url1;
          category.urlImagenBanner = url2;


          console.log(category);
          this.categoryService.saveCategory(category);

        } catch (error) {
          // Manejar cualquier error que ocurra durante la carga de imágenes
          console.error("Error al cargar las imágenes:", error);

        }
      }



    } else {
      this.markFormGroupTouched(this.categoryForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
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
