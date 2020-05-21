import { Component, ViewChild } from '@angular/core';
import { apiService } from '../api.service';
import { LoadingService } from '../loading.service';

class chargeCustomer {
    
  constructor(
    public id,
    public name,
    public plates,
    public creditCard,
    public exp,
    public code,
    public dateIn,
    public dateOut,
    public amount
  ) {}
}

@Component({
    selector: "charge-customers",
    templateUrl: "./charge.component.html",
    styleUrls: ["./charge.component.css"]
    })

    export class chargeComponent {
  
        
        constructor(  private api: apiService,  public loadingService: LoadingService) {}
       @ViewChild('fileList', {static: false}) fileList;
       

        ngOnInit() {
          this.getFileList();
        }

        ngAfterViewInit() {
         this.fileList.selectedOptions._multiple = false;
        }
        
        customerResults =[];
        fileResults = [];
        dateInStr;
        dateOutStr;
        fileNames;
        fileToCharge: boolean;
        fileNotInProcess: boolean = true;
        noCustomers: boolean = false;


      public getFileList(){
          this.api.get("https://ezpassforrentals.azurewebsites.net//Files").subscribe(  res => {
          this.fileResults = res;
          });
      }

        onSelection(file){
        this.fileToCharge = file;
        }

      getChargeList(){
              // to show html of results
                if (this.fileToCharge == undefined){
                  alert("Please select file");
                  return;
                }

          this.api.get("https://ezpassforrentals.azurewebsites.net/ListToCharge/" + this.fileToCharge  ).subscribe(  res => {
              console.log(res);
                if (res[0] == undefined){
                this.noCustomers = true
                }
                
               this.fileNotInProcess = false;

              this.customerResults = res.map((res: any) => {

                this.dateInStr = new Date(res.dateIn);
                this.dateOutStr = new Date(res.dateOut);
                res.dateIn = this.dateInStr.toLocaleDateString();
                res.dateOut = this.dateOutStr.toLocaleDateString();
                

                return new chargeCustomer(
                  res.id,
                  res.name,
                  res.plates,
                  res.creditCard,
                  res.exp,
                  res.code,
                  res.dateIn,
                  res.dateOut,
                  res.chargedAmount
                  );
              });
          });
      }
      goBack(){
        this.fileNotInProcess = true;
              }
}