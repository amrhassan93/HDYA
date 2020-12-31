import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Product } from '../../models/interfaces/product'
import { ProductsService } from '../../services/products.service'
import { AuthenticationService } from '../../services/authentication.service'
import { Profile } from '../../models/interfaces/profile'
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  // cart:Product[] = [] ;
  // total:Array<number> = [] ;
  // totalPrice:number = 0 ;
  orders:Array<object> = [] ;
  checkout:object = {} 

  myProfile:Profile
  constructor(private _products:ProductsService,
              private _auth:AuthenticationService,
              private route:Router
    ) {}

  ngOnInit(): void {
    AOS.init();
    this._auth.userProfile().subscribe(
      (data)=> this.myProfile = data,
      (err)=> console.log(err),
       )

    
    if (localStorage.getItem("orders")){
      this.orders = JSON.parse(localStorage.getItem("orders") || '{}') 
    }else{
      this.route.navigate(['/search'])
    }

    if (localStorage.getItem("checkout")){
      this.checkout = JSON.parse(localStorage.getItem("checkout") || '{}') 
    }

  }

  // calcPrice(prd_id :number ,  Prd_price:number , quantaty:number , index:number){
   
  //   this.total[index] = quantaty * Prd_price    
  //   this.totalPrice = 0
  //   for ( let i=0 ; i< this.total.length ; i++){
  //     this.totalPrice += this.total[i]
  //   }
  //   if(this.orders.length > 0){

  //     let found = false ;
  //     for(let i =0 ; i <this.orders.length ; i++){
  //       if (this.orders[i].product == prd_id){
  //         this.orders[i] = {product : prd_id , quantaty : quantaty}
  //         found = true ;
  //         break ;
  //       }
  //     }if(found == false){
  //       this.orders.push({product : prd_id , quantaty : quantaty})
  //     }
  //   }
  //   else{
  //     this.orders.push({product : prd_id , quantaty : quantaty})

  //   }
  //   console.log(this.orders);
  // }


  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    // if (!localStorage.getItem("cart")){
    //   this.cart = []
    // }else{
    //   localStorage.setItem('cart',JSON.stringify(this.cart))
    // }
  }

  orderNow(){
    for(let i =0 ; i < this.orders.length ; i++){
      this._products.order(this.orders[i].product ,  this.orders[i].quantaty ).subscribe(
        (data)=>{
          localStorage.removeItem("cart")
          localStorage.removeItem("orders")
          localStorage.removeItem("checkout")
          console.log(data)
      },

        (err)=> console.log(err)
        )
    }
  }
}
