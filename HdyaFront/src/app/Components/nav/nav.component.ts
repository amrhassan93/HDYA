import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { Category } from '../../models/interfaces/category'
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  usertoken: any ;
  productList: Product[] = [];
  filteredProductList: Product[] = [];

  categoryList:Category[]=[];
  cart:Product[] = []
 
  options = {
    autoClose: true,
    keepAfterRouteChange: true
};

  constructor(private auth:AuthenticationService,private _products:ProductsService,private route:Router,
    protected alertService: AlertService) {}

  ngOnInit(): void {
    this._products.viewProducts().subscribe(
      (data)=>this.productList=data.results,
      (err)=> console.log(err) 
    )      
    this._products.showcategories().subscribe(
      (data)=>this.categoryList = data.results,
      (err) => console.log(err) 
    )

    if (localStorage.getItem("cart")){
      this.cart = JSON.parse(localStorage.getItem("cart") || '{}') 

    }

  }

  search(searchKey:string){

    localStorage.setItem('searchKey' , searchKey)
    
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.usertoken = localStorage.getItem('token')
    this.cart = JSON.parse(localStorage.getItem('cart') || '{}')
    
  }

  logout(){
    this.auth.logout().subscribe(
      (data)=>{
        localStorage.removeItem('token')
        this.route.navigate(['/login'])
        this.alertService.info('See you soon :)', this.options)

      },
      (err)=>console.log(err)
    )
  }

}