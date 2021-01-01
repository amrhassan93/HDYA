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

  orderNow(){
    for(let i =0 ; i < this.orders.length ; i++){
      this._products.order(this.orders[i].product ,  this.orders[i].quantaty ).subscribe(
        (data)=>{
          alert("Thanks For Your Orders")
          localStorage.removeItem("cart")
          localStorage.removeItem("orders")
          localStorage.removeItem("checkout")
          console.log(data)
          this.route.navigate(['/search'])
      },

        (err)=> console.log(err)
        )
    }
  }
}
