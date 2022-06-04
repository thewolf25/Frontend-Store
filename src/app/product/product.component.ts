import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { BucketService } from '../bucket.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  server = window.location.origin
  private err;
  private products;
  private subscription;
  currentPage=0;
  quantity : number = 0;
  currentProduct;
  currentFile;
  editPhoto = false;
  selectedFile;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  categories;
  selectedSorted:string;
  pageProduct;
  constructor(private categoryService :CategoryService,private router: Router,private productService:ProductService,private route:ActivatedRoute, private bucketService:BucketService) {
   
  }
 
   @Input() id : string = "laptop"
 
   ngOnInit(): void {
     this.selectedSorted = "featured";
    this.categoryService.getCategory("/categories").subscribe(
      (s)=> {this.categories = s["_embedded"]["categories"]
    },
    (err)=>{
      console.log("prductComponnet " + err)
    }
      );
    this.route.params.subscribe(s =>{
      this.id = s.id
      this.getProductsbyCategory(this.id);
    });    
  }
 

  getProductsbyCategory(id){
    this.subscription = this.categoryService.getProduct(id).subscribe(
      (s)=>{
        //this.products = Object.values(s).forEach((p)=>{ p.quantity = 0});
        //console.log(Object.values(this.products))
        this.products = s;
        this.products.forEach((p)=>{ p.quantity = 0})
        if(this.products.length > 9 ){
          this.currentPage = 0;
         this.pageProduct = this.products.slice(this.currentPage,9)
        }
        else{
          this.currentPage = 0;
         this.pageProduct = this.products;
        }
      },
      (err) =>{
        console.log(err)
        this.err = err.error
      }
      )
    
  }

  getProducts(){
    //return this.products;
    return this.pageProduct;    
  }
  OnEditPhoto(p){
    this.editPhoto = !this.editPhoto;
    this.currentProduct = p
  }
  ngOnDestroy(): void {
   
    if(this.subscription){
      this.subscription.unsubscribe() 
    }
  }

  addToBucket(product){
      this.bucketService.addOrder(product);
  }

  OnSelectedFile(event){
    this.selectedFile = event.target.files;
  }
  upload(){
    console.log(this.selectedFile.length)
    for(let index=0;index < this.selectedFile.length;index++){
     
        this.progress = 0;
        this.currentFile = this.selectedFile.item(index);
        this.productService.upload(this.currentFile,this.currentProduct.id).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          err => {
            this.progress = 0;
            this.message = 'Could not upload the file!';
            this.currentFile = undefined;
          });
 
    }

   this.selectedFile = undefined;
    

  }

  navigate(path){
    this.router.navigateByUrl("/products/"+path)
  }

  getError(){
    return this.err;
  }

  parsePrice(price){
    return parseFloat(price.toFixed(3))
  }


  toSingleProduct(id){
    this.router.navigate(['/singleProduct', id]);
  }

  deleteProduct(id){
    this.bucketService.deleteBucket(id);
  }


  // a faire

  nextPagination(){
      this.currentPage++;
      if(this.currentPage != Math.trunc(this.products.length / 9)){
      this.pageProduct = this.products.slice(this.currentPage  * 9,this.currentPage*9 + 9)
      }else{
        this.pageProduct = this.products.slice(this.currentPage  * 9,this.products.length - 1)
      }
  }

  previousPgination(){
    this.currentPage--;
    if(this.currentPage <0){
      this.pageProduct =  this.products.slice(0,this.currentPage*9 + 9)

    }
    else{
    this.pageProduct =  this.products.slice(this.currentPage * 9,this.currentPage*9 + 9)
    }
  }

  selectedPagination(page){
    this.currentPage = page;
    this.pageProduct =  this.products.slice(this.currentPage * 9,this.currentPage*9 + 9)

  }


  checkEnd(){
    if(this.products != undefined)
    return this.currentPage == Math.trunc(this.products.length/9)
  }



}