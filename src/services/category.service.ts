import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private server = environment.Server
  constructor(private http: HttpClient) {
   }


   getCategory(url){
      return this.http.get(this.server+url);
   }

   getProduct(id){
     return this.http.get(this.server+"/products/category/"+id)
   }
}
