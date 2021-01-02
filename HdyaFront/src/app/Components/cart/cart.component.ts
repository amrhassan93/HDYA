import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { SpinnerService} from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart:Product[] = [] ;
  total:Array<number> = [] ;
  totalPrice:number = 0 ;
  orders:Array<object> = [] ;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  constructor(private _products:ProductsService,private route:Router,
    protected alertService: AlertService,private _spinner:SpinnerService) { }

  ngOnInit(): void {
    AOS.init();
    if (localStorage.getItem("cart")){
      this.cart = JSON.parse(localStorage.getItem("cart") || '{}') 
      for (let i in this.cart){
        this.calcPrice(this.cart[i].id ,this.cart[i].price, 1 , i)
      }
    }
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (!localStorage.getItem("cart")){
      this.cart = []
    }
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
    console.log(this.orders);
  }


  orderNow(){
    for(let i =0 ; i < this.cart.length ; i++){
      this._products.order(this.orders[i].product ,  this.orders[i].quantaty ).subscribe(
        (data)=>{
          localStorage.removeItem("cart")
          console.log(data)
      },

        (err)=> console.log(err)
        )
    }
  }
  emptyCart(){
    localStorage.removeItem("cart")
    this.alertService.warn('Cart is Empty!!', this.options)
    // this._spinner.requestStarted()
  }
  removeitem(prd_id:number){
    for(let i =0 ; i < this.cart.length ; i++){
      if(this.cart[i].id == prd_id)
      this.cart.splice(i,1)
    }
    localStorage.setItem('cart',JSON.stringify(this.cart))
  }
}
