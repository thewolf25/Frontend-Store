import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { BucketService } from '../bucket.service';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit,OnDestroy {
  private id;
  product;
  quantity = 1;
  subscription
  constructor(private route:ActivatedRoute, private productService:ProductService,private bucketService:BucketService) { 
  this.id = this.route.snapshot.params.id;
  
  }
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.productService.getSingleProduct(this.id).subscribe(
      (s)=>{
        this.product = s;
        console.log(this.product)
  
      }
    );
  }
  addToBucket(product){
    product.count = this.quantity;
    this.bucketService.addOrder(product);
}
  minusQuantity(){
    if(this.quantity != 1){
      this.quantity--;  
    }
    
    
  }

  plusQuantity(){
    this.quantity++;
  }
  parsePrice(price){
    return parseFloat(price.toFixed(3))
  }

}
