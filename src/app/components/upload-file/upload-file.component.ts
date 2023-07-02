import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  selectedFile: File | null = null;

  constructor(private storage: AngularFireStorage,private spinner: NgxSpinnerService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
  }

  uploadFile() {
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
  }





}
