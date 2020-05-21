import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading.service';

@Component({
    selector: 'upload-file',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
  })
  
  export class uploadComponent {
  
 

public progress: number;
public message: string;

//@Output() public onUploadFinished = new EventEmitter();

  constructor(  private http: HttpClient, public loadingService: LoadingService) {}
  
  public uploadFile(files){
      if (files.length === 0) {
        return;
      }
   
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
   
      this.http.post('https://ezpassforrentals.azurewebsites.net/files', formData).subscribe();

    } 
  }