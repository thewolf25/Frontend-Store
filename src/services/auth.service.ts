import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseJWT } from 'src/app/model/ResponseJWT';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  
  private user;
  private tokenDatabase;
  private token;
  private isAuthenticated = false;
  private Authenticated;
  private environment = environment;
  private users= [
    {"username":"username" , "password":"password"},
    {"username":"username1" , "password":"password1"},
    {"username":"username2" , "password":"password2"}
  ]


  
  constructor( private authService:SocialAuthService, private http: HttpClient) { }

  isAdmin(){
    //return this.user
  }

  getIsAuthenticated(){
      return new Observable(observer => {
        observer.next(!!localStorage.getItem('authToken'))}
      );
  }

  Authenticate(user:string,password:string){
  this.http.post(environment.Server+"/authenticate",{username:user, password:password}).subscribe(
    (resp:ResponseJWT)=>{
        this. tokenDatabase = resp.token;
        this.isAuthenticated = true;
        this.saveUser();
    },
    (err)=>{
        console.log( err)   
    }

  )}
  

  

  // saveUser(){
  //   if(this.isAuthenticated){
  //     localStorage.setItem('authToken',btoa(JSON.stringify(this.tokenDatabase)))
  //   }
  // }

  saveUser(){
    if(this.isAuthenticated){
      localStorage.setItem('authToken',this.tokenDatabase)  
  }
  }

  // loadUser(){
  //   let token =  localStorage.getItem('authToken');
  //   console.log(token)
  //   if(token != null){
  //      this.user =  JSON.parse(atob(token))
  //      this.tokenDatabase = JSON.parse(atob(token));
  //      this.isAuthenticated = true
  //     return this.tokenDatabase; 
  //   }  
    
  // }

  loadUser(){
    let token = localStorage.getItem('authToken');
    if(token != null){
        this.isAuthenticated = true;
        return token
    }
  }


  getToken(){
    return localStorage.getItem('authToken');

  }


  Deconnect(){
    localStorage.removeItem('authToken');
    this.isAuthenticated= false
    this.user = undefined
    
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  signOut(): void {
    this.authService.signOut();
  }

  authState(){
    this.authService.authState.subscribe((user) => {
      
    this.Authenticate(user.name , "mehdi")  
      
  })
}



  getUser(){

    // jwt_decode(this.getToken())
    // if(!this.getToken()){
    //   return null
    // }
    // else{

      // let decoded = jwt_decode(this.getToken())
      //  return {'name' : decoded.sub }
    // }
    

    return new Observable((observer)=>{
      let decoded :any= jwt_decode(this.getToken())
      observer.next({'name' : decoded.sub })
      
    })
    


    //  if(this.user != null) {
    //     return this.user
    //  }
  }
}
