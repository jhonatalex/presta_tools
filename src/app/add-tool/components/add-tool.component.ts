import { Component, OnInit } from '@angular/core';


import {  inject} from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { ToolService } from 'src/app/services/tool.service';
import { Tool } from '../models/tool.model';
import { UploadFileComponent } from 'src/app/components/upload-file/upload-file.component';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AngularFireStorage } from '@angular/fire/compat/storage';




@Component({
  selector: 'add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.css'],
  providers:[ToolService,UploadFileComponent],

})

export class AddToolComponent implements OnInit {

  selectedFile: File | null = null;

  public tool!: Tool;
  constructor( private toolServisce:ToolService,
               private spinner: NgxSpinnerService,
               private storage: AngularFireStorage,
     ) { }


  ngOnInit(): void {
  }



  onSubmit(form:NgForm):void{


    var url = this.uploadFile();


    //let response = this.userService.post('/api/user/insert',this.user).subscribe(response=>{
     console.log(url);
    //
    //this.toolServisce.saveTool(this.tool);

  }



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  uploadFile():String {
    if (this.selectedFile) {
      const filePath = `imagenes/tool/${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);

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


