import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BucketService } from '../bucket.service';
import {render} from 'creditcardpayments/creditCardPayments';
@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {
  private nbr_orders;
  private order_list;
  shipping = 7;
  taxes = 0.06;
  checkoutForm = new FormGroup({
    name: new FormControl(
      '',
      [
        Validators.required,
      ]

    ),
    email: new FormControl(
      '',
      [Validators.required,
      Validators.email]
    ),
    telephone: new FormControl(
      '',
      [Validators.required]

    ),
    address: new FormControl(
      '',[Validators.required]
    )
  });

  constructor(private bucketService :BucketService) {
    // render(
    //   {
    //     id: "#myPaypalButtons",
    //     currency: "USD",
    //     value: "100.00",
    //     onApprove: (details)=>{
    //       alert("transaction success");
    //     }
    //   }
    //   );
  }

  validateForm(){
    if(this.checkoutForm.valid)
      this.bucketService.validateCommand(this.checkoutForm.value).subscribe((s)=>{
         console.log(s)
      },
      (err)=>{
        console.log(err)
      }
      )
      
  }
   add_orders(e){
      this.bucketService.addOrder(e);
   }

   delete_orders(e){
      this.bucketService.deleteBucket(e)
   }

   update_orders(id){

   }

   getProducts(){
     return this.bucketService.getProducts();
   }
   minusQuantity(id){
      this.bucketService.changeQuantity(id,-1);
   }

   plusQuantity(id){
    this.bucketService.changeQuantity(id,1);

   }

   getTotalPrice(){
     return this.bucketService.getPrice();
   }


   parsePrice(price){
     return this.bucketService.parsePrice(price)
   }


   getTotalPriceSaled(){
     let price = this.getTotalPrice();

     console.log(price)

     return price + this.shipping + (price * this.taxes)
   }

  ngOnInit(): void {
  }
  

}
