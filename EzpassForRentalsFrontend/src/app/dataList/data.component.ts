import { Component, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from "../dialog/dialog.component"
import { Customer } from '../customer';
import { apiService } from '../api.service';
import { LoadingService } from '../loading.service';



@Component({
selector: "customer-data",
templateUrl: "./data.component.html",
styleUrls: ["./data.component.css"]
})
export class dataComponent {
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
 
  constructor( public dialog: MatDialog, private api: apiService,  public loadingService: LoadingService) {}
  
  ngOnInit() {
    this.getdata();
  }

  displayedColumns: string[] = ["name", "tag", "dateRented", "dateBack", "icon", "edit", "delete"]

  results =[];
  editedCustomer: Customer; 
   
     getdata(){
       this.api.get("https://ezpassforrentals.azurewebsites.net/Customer").subscribe(  res => {
         
          this.results = res.map((res: any) => {
             var dateInStr = new Date(res.dateIn);
             var dateOutStr = new Date(res.dateOut);
             res.dateIn = dateInStr.toLocaleDateString();
             res.dateOut = dateOutStr.toLocaleDateString();

             return new Customer(
               res.name,
               res.plates,
               res.creditCard,
               res.exp,
               res.code,
               res.dateIn,
               res.dateOut,
               res.id
               );
           });
        });
      }
  
  
  updateRowData(custObj){
  
    //this is to convert credit card from camelCase to PascalCase because the customer object received by the get
    //method automatically converts to camelCase so we need to change it back to PascalCase when submitting put method
    custObj.CreditCard = custObj.creditCard;
    delete custObj.creditCard;

    this.api.put("https://ezpassforrentals.azurewebsites.net/Customer", custObj).subscribe(  res => {
   
          this.results = this.results.filter((value) => {
            if(value.id == custObj.id){
              value.name = custObj.name;
              value.plates = custObj.plates;
              value.creditCard = custObj.CreditCard;
              value.exp = custObj.exp;
              value.code = custObj.code;
              value.dateIn =  new Date(custObj.dateIn).toLocaleDateString();
              value.dateOut = new Date(custObj.dateOut).toLocaleDateString();
            }
            return true;
          });
       });
    }
    deleteRowData(custObj){
        this.api.delete("https://ezpassforrentals.azurewebsites.net/Customer/" + custObj.id).subscribe(  res => {

           this.results = this.results.filter((value)=>{
              return value.id != custObj.id;
            });
        });
     }

  
    openDialog(action, obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogBoxComponent, {
           width: '250px',
           data:obj
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result){
                return;
            }
            if(result.event == 'Update'){
              this.updateRowData(result.data);
            }else if(result.event == 'Delete'){
                this.deleteRowData(result.data);
            }
        });
     }
  
     ccView(icon, obj){

       obj.action = 'Credit card';
       var iconPosition = icon.getBoundingClientRect();
       this.dialog.open(DialogBoxComponent, {
          position: {
          right: iconPosition.right - 175 + "px"
          },
        data:obj
      });
    }

}