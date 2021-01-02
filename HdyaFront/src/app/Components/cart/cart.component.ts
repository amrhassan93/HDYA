import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart:Array<object> ;
  total:Array<number> = [] ;
  totalPrice:number = 0 ;
  orders:Array<object> = [] ;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};  
  checkout:{[k:string]:any } = {}

  constructor(private _products:ProductsService,private route:Router,protected alertService: AlertService) { }

  ngOnInit(): void {
    AOS.init();
    if (localStorage.getItem("cart")){
      this.cart = JSON.parse(localStorage.getItem("cart") || '{}') 
      for (let i in this.cart){
        this.calcPrice(this.cart[i].productDetails.id ,this.cart[i].productDetails.price, this.cart[i].quantity , i)
      }
    }
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (!localStorage.getItem("cart")){
      this.cart = []
    }else{
      localStorage.setItem('cart',JSON.stringify(this.cart))
    }
  }

  changeQntty(prd_id :number ,  Prd_price:number , quantaty:number , index:number){
    for (let i in this.cart){

      if(this.cart[i].productDetails.id == prd_id){

        this.cart[i].quantity = quantaty
        console.log(this.cart[i].quantity);
        console.log(this.cart); 
        localStorage.setItem('cart' ,JSON.stringify(this.cart))
      }
    }
    this.calcPrice(prd_id , Prd_price ,quantaty , index)
  }
  
  calcPrice(prd_id :number ,  Prd_price:number , quantaty:number , index:number){
    this.total[index] = quantaty * Prd_price    
    this.totalPrice = 0
    for ( let i=0 ; i< this.total.length ; i++){
      this.totalPrice += this.total[i]
    }
    if(this.orders.length > 0){

      let found = false ;
      for(let i =0 ; i <this.orders.length ; i++){
        if (this.orders[i].product == prd_id){
          this.orders[i] = {product : prd_id , quantaty : quantaty}
          found = true ;
          break ;
        }
      }if(found == false){
        this.orders.push({product : prd_id , quantaty : quantaty})
      }
    }
    else{
      this.orders.push({product : prd_id , quantaty : quantaty})
      
    }
    // console.log(this.orders);
  }


           
  toCheckout(){
    let sumtotalQuantity:[] = [] ;
    for (let i in this.cart){
      sumtotalQuantity.push(parseInt(this.cart[i].quantity)) 
    }
    var sum = sumtotalQuantity.reduce(function(a, b){
      return a + b;
    }, 0);


    this.checkout.totalPrice = this.totalPrice
    this.checkout.totalOrders = sum  
    localStorage.setItem('orders' ,JSON.stringify(this.orders))
    localStorage.setItem('checkout' ,JSON.stringify(this.checkout))

  }



  emptyCart(){
    localStorage.removeItem("cart")
    this.alertService.warn('Cart is Empty!!', this.options)
  }

  removeitem(prd_id:number){
    for(let i =0 ; i < this.cart.length ; i++){
      if(this.cart[i].productDetails.id == prd_id)
      this.cart.splice(i,1)
    }
    localStorage.setItem('cart',JSON.stringify(this.cart))
  }
}
