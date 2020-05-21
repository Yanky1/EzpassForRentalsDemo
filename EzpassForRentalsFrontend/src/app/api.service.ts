import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable()

export class apiService {
  

constructor(private http: HttpClient) {
  
}

   get( url){
   return this.http.get<any>(url);
   }
   
   getWithResponseType(url,typeResponse){
    return this.http.get<any>(url, {responseType: typeResponse});
   }
   
   post(url, content){
   
    return this.http.post(url, content);
    }
    put(url, content){
        return this.http.put<any>(url, content);
    }

    delete(url){
        return this.http.delete(url);

    }
}