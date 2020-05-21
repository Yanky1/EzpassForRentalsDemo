import { Component, OnInit } from '@angular/core' 
import { apiService } from '../api.service';
import { LoadingService }  from '../loading.service'

@Component({
    selector: "files-manager",
    templateUrl: "./files.component.html",
    styleUrls: ["./files.component.css"]
    })
    export class filesComponent implements OnInit {
 
        constructor(  private api: apiService, public loadingService: LoadingService) {}
 
      ngOnInit(){
        this.api.get("https://ezpassforrentals.azurewebsites.net/Files").subscribe( res => {
          this.fileResults = res;
        });
      }

   
        fileResults;
       
          downloadFile(file){
            this.api.getWithResponseType("https://ezpassforrentals.azurewebsites.net/Files/" + file, "arraybuffer")
            .subscribe(response => this.downLoadFile(response, file));
            
            }

                downLoadFile(data: any, file: string) {
                    let blob = new Blob([data], { type: "csv/text"});

                    const link = document.createElement('a');
                    
                    link.href = URL.createObjectURL(blob);
                    link.download = file;
                    
                    document.body.append(link);
                    link.click();
                    link.remove();

             }
            

    }