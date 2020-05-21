import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { apiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../loading.service';


@Component({
selector: "customer-form",
templateUrl: "./form.component.html",
styleUrls: ['./form.component.css']
})

export class formComponent {

constructor(private api: apiService, private router: Router, public loadingService: LoadingService) { 
}

 customerForm = new FormGroup({
name:  new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
plates: new FormControl('', Validators.required),
CreditCard: new FormControl('', Validators.required),
exp: new FormControl('', [Validators.required, Validators.pattern('^(0|1)[0-9]\/[0-9]{2}')]),
code: new FormControl('', Validators.required),
dateIn: new FormControl('', Validators.required),
dateOut: new FormControl('', Validators.required)
 })


onSubmit(){
   
  
    this.api.post("https://ezpassforrentals.azurewebsites.net/Customer", this.customerForm.value).subscribe(res => {
    this.router.navigate(['/dataComponent'])
    });
  }
}