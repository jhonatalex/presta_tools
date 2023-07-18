import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initCategoryForm();
  }

  initCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      idCat: ['', Validators.required],
      titleCat: ['', Validators.required],
      descripCat: ['', Validators.required],
      urlImagen: ['', Validators.required],
      urlImagenBanner: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.categoryForm.valid) {
      const category: Category = {
        idCat: this.categoryForm.value.idCat,
        titleCat: this.categoryForm.value.titleCat,
        descripCat: this.categoryForm.value.descripCat,
        urlImagen: this.categoryForm.value.urlImagen,
        urlImagenBanner: this.categoryForm.value.urlImagenBanner
      };

      // Aquí puedes hacer lo que necesites con la categoría enviada, por ejemplo, enviarla a una API o hacer algún procesamiento adicional.
      console.log(category);
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

}
