  
import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../error-dialog/error.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { LoadingService } from '../loading.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/finally';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public errorDialogService: ErrorDialogService, private loadingService: LoadingService) { }

  

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //to display mat-spinner where the requst is, by setting the isLoading to true
        this.loadingService.isLoading = true;

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};

                if (error.error instanceof ErrorEvent) {
                    // client-side error

                    data = {
                        reason:   error.error.message,
                        status: error.status
                    };

                
                } else {
                    // server-side error

                    data = {
                        reason: error.message,
                        status: error.status
                    };

                   
                }
                
                this.errorDialogService.openDialog(data);
                return throwError(error);
            })).finally(() => this.loadingService.isLoading = false);
    }


}