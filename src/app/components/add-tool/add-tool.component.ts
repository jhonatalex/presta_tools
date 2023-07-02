import { Component, OnInit } from '@angular/core';


import {  inject} from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.css'],

  template: `
  <h1>Storage</h1>
  <label for="fileUpload">Choose a File</label>
  <input id="fileUpload" type="file" #upload>
  <button (click)="uploadFile(upload)">Upload</button>
`,




})

export class AddToolComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }






}


