import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products.service'
import { AlertService } from 'src/app/_alert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  cart:Array<object> = [];
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  constructor(private _products:ProductsService ,
              protected alertService: AlertService,
              private _route:Router
              ) {}

  addProductToCart(product_id:number , quantity:number = 1){
    let addtocart;
    let finaldetails :{[k: string]: any} = {}
    this._products.viewProductById(product_id).subscribe(
      (data)=>{
        addtocart = data
        finaldetails.productDetails = addtocart    
        finaldetails.quantity = quantity   
        console.log(finaldetails);
        this.cart.push(finaldetails)
        localStorage.setItem("cart" , JSON.stringify(this.cart))
        this.alertService.success('Success!!', this.options)
      },
      (err)=>console.log(err)
    )    
  }

  addCart(product_id:number , quantity:number = 1){
      if (localStorage.getItem("cart")){
        this.cart = JSON.parse(localStorage.getItem("cart") || '{}') 
        if(this.cart.length > 0){
          let found = false
          for(let i in this.cart){
            if(this.cart[i].productDetails.id == product_id){
              found = true;
              break;
            }
          }
          if(found == false){
            this.addProductToCart(product_id , quantity)
          }else{
            this._route.navigate(['/cart'])
            alert("This Product already exits in the cart")
          }
        }else{
          this.addProductToCart(product_id , quantity)
        }
      }else{
        this.addProductToCart(product_id , quantity)
      }
  }
}
