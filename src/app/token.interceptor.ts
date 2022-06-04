import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.tokenService.loadUser();
    const re = "/authenticate";

    if(this.tokenService.getIsAuthenticated() && token != undefined && request.url.search(re) === -1 ){
    let tokenized = request.clone({
      setHeaders : {   
        Authorization : `Bearer ${token}` }
    })   
    return next.handle(tokenized);
  }
  return next.handle(request);
}
}
