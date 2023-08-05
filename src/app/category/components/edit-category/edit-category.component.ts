import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../providers/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: any;
  selectedFile1 : File | null = null;
  selectedFile2: File | null = null;
  public url_image_1:string='';
  public  url_image_2:string='';
  public id: number=0;
  category: any;

  constructor(
        private formBuilder: FormBuilder,
        private categoryService1:CategoryService,
        private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.getCategoryDetail();
    this.initCategoryForm();
  }


  initCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      titleCat: ['this.category.titleCat', Validators.required],
      descripCat: ['', Validators.required],

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

  getCategoryDetail():void{
    //obtener el  id de la URL
    this.route.params.subscribe(params =>{
    this.id = +params['id'];//guardamos parametro en la variable id y convertimos en entero

    this.categoryService1.getListCategoryProviders()

      this.categoryService1.getDetailCategoryProviders(this.id).subscribe((response:Category)=>{
     // let data = Object.values(response);
      this.category = response;
      console.log(this.category);
      })

    });

  }

  submitForm(Form:any){

  }



}
