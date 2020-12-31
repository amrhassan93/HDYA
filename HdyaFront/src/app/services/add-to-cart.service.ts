import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products.service'
import { AlertService } from 'src/app/_alert';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  cart:Array<object> = [];
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};
  constructor(private _products:ProductsService ,protected alertService: AlertService) {}
   addCart(product_id:number , quantity:number = 1){
    
    let addtocart;
    // let quantity = 1 ; 
    let finaldetails :{[k: string]: any} = {}

    this._products.viewProductById(product_id).subscribe(
      (data)=>{
        addtocart = data
        finaldetails.productDetails = addtocart    
        finaldetails.quantity = quantity   

        console.log(finaldetails);

        if (localStorage.getItem("cart")){
          this.cart = JSON.parse(localStorage.getItem("cart") || '{}') 
          this.cart.push(finaldetails)
    
          localStorage.setItem("cart" , JSON.stringify(this.cart))
          this.alertService.success('Success!!', this.options)
        }
        else {
          this.cart.push(finaldetails)
          localStorage.setItem("cart" , JSON.stringify(this.cart))
          // console.log(this.cart);
          this.alertService.success('Success!!', this.options)
        }
      },
      (err)=>console.log(err)
    )
  }

}
