import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    username: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3),
        
      ]

    ),
    password: new FormControl(
      '',
      [Validators.required,
      Validators.minLength(3)]
    )
  });
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    

  }
  validate(){
   
    //console.log(this.loginForm.controls.username.errors)
    this.authService.Authenticate(this.loginForm.value.username,this.loginForm.value.password)
    if(this.authService.getIsAuthenticated()){
       this.router.navigateByUrl("/home")
    }
  }


  signInWithFB(): void {
    this.authService.signInWithFB();
  }
}
