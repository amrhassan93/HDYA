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

  constructor(private auth:AuthenticationService ,
              private _products:ProductsService ,
              private route:Router,
              // private activerouter:ActivatedRoute,
              ) {

    // if (localStorage.getItem('token')){
    //   this.usertoken = localStorage.getItem("token")
    // }
    // else{
    //   console.log('no token')
    // }
    // console.log(this.usertoken);
    
   }

  ngOnInit(): void {
    this._products.viewProducts().subscribe(
      (data)=>this.productList=data,
      (err)=> console.log(err) 
    )      
    this._products.showcategories().subscribe(
      (data)=>this.categoryList = data,
      (err) => console.log(err) 
    )
  }

  search(searchKey:string){
    // let id = this.activerouter.snapshot.params['id']
    // if(this.activerouter.snapshot.routeConfig ){

    // }
    this._products.viewProducts().subscribe(
      (data)=>this.productList=data,
      (err)=> console.log(err) 
    )   

    for (let i = 0 ; i < this.productList.length ; i++){
      if (this.productList[i].name.toLowerCase().includes(searchKey.toLowerCase())){
        this.filteredProductList.push(this.productList[i])
      }else{
        console.log('this is not in products');
      }
    }

    this.productList = this.filteredProductList
    this.filteredProductList = []
     console.log(this.productList)
    localStorage.setItem('products' ,  JSON.stringify(this.productList))
    return this.route.navigate(['/search'] )

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.usertoken = localStorage.getItem('token')
    
  }

  logout(){
    this.auth.logout().subscribe(
      (data)=>localStorage.removeItem('token'),
      (err)=>console.log(err)
    )
  }

}
