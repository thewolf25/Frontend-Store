import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.Server;
  constructor(private http:HttpClient) { }
  upload(file: File, product): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.baseUrl+"/products/uploadPhoto/"+product, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getSingleProduct(id){
    return this.http.get(environment.Server+"/products/"+id);
  }

  getAllProducts(){
   return this.http. get(environment.Server+'/products');
  }

}
