import { Component, OnInit } from '@angular/core';


import {  inject} from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { ToolService } from 'src/app/services/tool.service';
import { Tool } from '../models/tool.model';

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

  //public tool: Tool;
  constructor(private toolServisce:ToolService) { }

  ngOnInit(): void {
  }


  onSubmit(form:NgForm):void{
    //let response = this.userService.post('/api/user/insert',this.user).subscribe(response=>{
     // console.log(response);
    //
    //this.toolServisce.saveTool(this.tool);

  }





}


