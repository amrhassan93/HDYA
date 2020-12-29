import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products.service'
import { AlertService } from 'src/app/_alert';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  cart:Array<object> = [];

  constructor(private _products:ProductsService ,protected alertService: AlertService) {}
   addCart(product_id:number){
    
    let addtocart;

    this._products.viewProductById(product_id).subscribe(
      (data)=>{
        addtocart = data
        console.log(addtocart);
        if (localStorage.getItem("cart")){
          this.cart = JSON.parse(localStorage.getItem("cart") || '{}') 
          this.cart.push(addtocart)
    
          localStorage.setItem("cart" , JSON.stringify(this.cart))
          this.alertService.success('Success!!', this.options)
        }
        else {
          this.cart.push(addtocart)
          localStorage.setItem("cart" , JSON.stringify(this.cart))
          // console.log(this.cart);
          this.alertService.success('Success!!', this.options)
        }
      },
      (err)=>console.log(err)
    )
  }

}
