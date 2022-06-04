import { HttpClient, HttpRequest } from '@angular/common/http';
import { ArrayType, ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';
import *  as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class BucketService {
  buckets ;
  constructor(private http:HttpClient) { }

order = {
  custmer:{
    
  },
  ordrer:{}
  
}


  loadBucket(){
    let bucket = JSON.parse(localStorage.getItem('bucket'));
    if(bucket != undefined)
      this.buckets = bucket;

      else
      this.buckets = [];
  }

  getProducts(){
    this.loadBucket();
    return this.buckets;
  }

  addOrder(a){
    this.loadBucket();
    var changed = false;    
     if(this.buckets.length > 0){
      
     this.buckets.forEach((b)=>{
      if(a.id == b.id){
         b.quantity += a.qauantity
         changed = true;
      }
      
    });
    if(!changed){
      this.buckets.push(a);
    }
}
  else{
  this.buckets.push(a)
  }  
  this.saveBucket();
  

  }

  saveBucket(){
    localStorage.setItem('bucket', JSON.stringify(this.buckets));
  }
  deleteBucket(e){
    this.loadBucket();
    this.buckets = this.buckets.filter(function(value, index, arr){ 
      return value.id !=  e.id;
  });
    this.saveBucket()
  }

  getPrice(){
    this.loadBucket();
    let price = 0
    this.buckets.forEach((p)=>{
      price += p.currentPrice * p.quantity;
    });
    return parseFloat(price.toFixed(3));
  }


  getNbrProduct(){
    this.loadBucket()
    return this.buckets.length
  }


  changeQuantity= (id,nbr)=>{
    this.loadBucket();
    this.buckets.forEach((b)=>{
      if(id == b.id){
         b.quantity += nbr
        if(b.quantity == 0){
          this.deleteBucket(b);
        }
      }
  });
  this.saveBucket();
  }

  parsePrice(price){
    return parseFloat(price.toFixed(3))
  }

  validateCommand(o){
    this.loadBucket();
    console.log(this.buckets)
    o.orders = this.buckets.map(s => _.pick(s,["id","nom","couleur","size","quantity"]))
    console.log(o)

    return this.http.post('/order/command',o);
    // const req = new HttpRequest('POST', +"/products/"+product, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });

    // return this.http.request(req);
    // // this.http.post()
    
    }
 
}
