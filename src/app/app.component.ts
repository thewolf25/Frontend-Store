import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { BucketService } from './bucket.service';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{
  nbrProduct = 0;
  title = 'ecommerce-angular';
  activeRoute = "";
  shopCategory=false
  private categories;
  public showOverlay = true;
  allProducts;
  searchedProducts;
  searchedKey="";
  isAuth:boolean;
  // user: SocialUser;
  user:any = null;
  loggedIn: boolean;
  constructor(private authService:AuthService,
    private productService : ProductService,
    private  categoryService: CategoryService,
    private router:Router,
    private route:ActivatedRoute, 
    private bucketService: BucketService,
    //private authService: SocialAuthService
    ){

    
    
    //this.authService.loadUser()
    //this.isAutenticated = this.authService.getIsAuthenticated()
    // if(!this.isAuthenticated){
    //    this.router.navigateByUrl('/login')
    // }
    
    

    
    // router.events.subscribe((event: RouterEvent) => {
    //  this.navigationInterceptor(event)
     
    // })
  }
  ngAfterViewInit(): void {
    this.authService.getIsAuthenticated().subscribe((a:boolean) =>{
      this.isAuth = a
    })
  }
  ngOnInit(): void {
     
      this.authService.getIsAuthenticated().subscribe((a:boolean) =>{
        this.isAuth = a
      })


      this.categoryService.getCategory("/categories").subscribe(
        (s)=> {this.categories = s["_embedded"]["categories"]
              this.nbrProduct =   this.bucketService.getPrice()
      ;

      this.productService.getAllProducts().subscribe((s)=>{
          this.allProducts = s["_embedded"].products;

      })


      }

    
        
        );

        this.authService.getUser().subscribe((s)=>{
              this.user = s
        })
      }

  getUser(){
    this.user = this.authService.getUser();
    return this.authService.getUser();
  }


  getCategories(){
    return this.categories;
  }
  setActiveRoute(active){
    this.activeRoute = active;
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }


  isAuthenticated(){
    return this.authService.getIsAuthenticated();
  }


  deconnection(){
    //this.authService.Deconnect();
    this.router.navigate(['/logout'])
  }


  getNbrBucket(){
    return this.bucketService.getNbrProduct()
  }

  toBucket(){
    this.router.navigate(["checkout"]);
  }

  search(event){
    if (this.searchedKey != undefined && this.allProducts != undefined) 
    this.searchedProducts = this.allProducts.filter(function(value, index, arr){ 
      return value.nom.includes(event);
    });
  }
  toSingleProduct(id){
    this.router.navigate(['/singleProduct', id]);
  }
  parsePrice(price){
    return parseFloat(price.toFixed(3))
  }

 // addition 

 signInWithGoogle(): void {
  this.authService.signInWithGoogle();
}



signOut(): void {
  this.router.navigate( ['/logout'] );
}
 
}
