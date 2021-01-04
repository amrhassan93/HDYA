import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { Category } from '../../models/interfaces/category'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

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


  constructor(private auth:AuthenticationService,private _products:ProductsService,private route:Router) {}

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
    // console.log(this.cart.length);

  }

  search(searchKey:string){

    localStorage.setItem('searchKey' , searchKey)
    // let id = this.activerouter.snapshot.params['id']
    // if(this.activerouter.snapshot.routeConfig ){

    // }
    // this._products.viewProducts().subscribe(
    //   (data)=>this.productList=data.results,
    //   (err)=> console.log(err) 
    // )   

    // for (let i = 0 ; i < this.productList.length ; i++){
    //   if (this.productList[i].name.toLowerCase().includes(searchKey.toLowerCase())){
    //     this.filteredProductList.push(this.productList[i])
    //   }else{
    //     console.log('this is not in products');
    //   }
    // }

    // this.productList = this.filteredProductList
    // this.filteredProductList = []
    // console.log(this.productList)
    // localStorage.setItem('products' ,  JSON.stringify(this.productList))
    // return this.route.navigate(['/search'] )
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
      },
      (err)=>console.log(err)
    )
  }

}