import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { formComponent } from './form/form.component';
import { dataComponent } from './dataList/data.component'
import { uploadComponent } from './upload/upload.component';
import { chargeComponent } from './charge/charge.component';
import { AngularMaterialModule } from './material.module';
import { DialogBoxComponent } from './dialog/dialog.component';
import { filesComponent } from './fileList/files.component';
import { apiService } from './api.service';
import { aboutComponent } from './about/about.component';
import { ErrorDialogComponent } from './error-dialog/error.component';
import { ErrorDialogService } from './error-dialog/error.service';
import { HttpConfigInterceptor } from './httpInterceptor/http.interceptor';
import { LoadingService } from './loading.service'

@NgModule({
  declarations: [
    dataComponent,
    AppComponent,
    formComponent,
    uploadComponent,
    chargeComponent,
    DialogBoxComponent,
    filesComponent,
    aboutComponent,
    ErrorDialogComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    RouterModule.forRoot([
      { path: '', component: formComponent },
      { path: 'uploadComponent', component: uploadComponent },
      { path: 'dataComponent', component: dataComponent },
      { path: 'formComponent', component: formComponent },
      { path: 'chargeComponent', component: chargeComponent },
      { path: 'filesComponent', component: filesComponent },
      { path: 'aboutComponent', component: aboutComponent }
    ], { useHash: true })
  ],
  entryComponents: [
    DialogBoxComponent,
    ErrorDialogComponent
  ],
  providers: [ 
    apiService, 
    ErrorDialogService, 
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true } ],
  bootstrap: [AppComponent],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }