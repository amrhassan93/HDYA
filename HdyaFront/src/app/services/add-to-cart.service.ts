import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products.service'
import { Product } from '../models/interfaces/product'
import { Category } from '../models/interfaces/category'
import { AlertService } from 'src/app/_alert';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  productList: Product[] = [];
  cart:Array<object> = [];
  totalRecords: number | undefined
  categoryList:Category[]=[];
  moreData:Product[]= []
  relationships: any;
  occassions: any;

  constructor(private _products:ProductsService ,protected alertService: AlertService) {
    if(localStorage.getItem('products')){

      let searchProducts = localStorage.getItem('products')
      // console.log(searchProducts instanceof Array);
      
      this.productList = JSON.parse(searchProducts || '{}')
      this.totalRecords = this.productList.length
      localStorage.removeItem('products')
      
    }
    else {
      this._products.viewProducts().subscribe(
        (data)=>{
          this.productList=data.results;
          this.totalRecords = data.results.length
          // console.log(this.productList);
          this.moreData = data
          // this.allproducts = this.productList
        },
        (err)=> console.log(err) 
      )    
    }

    this._products.showcategories().subscribe(
      (data)=>this.categoryList = data.results,
      (err) => console.log(err) 
    )
    this._products.showrelations().subscribe(
      (data)=>this.relationships=data.results,
      (err)=>console.log(err) 
    )

    this._products.showoccassions().subscribe(
      (data)=>this.occassions=data.results,
      (err)=>console.log(err) 
    )
   }


   addCart(product_id:number){
    
    if (localStorage.getItem("cart")){
      this.cart = JSON.parse(localStorage.getItem("cart") || '{}') 

      let addtocart = this.productList.find((product)=>{ 
        return product.id == product_id
        })

      this.cart.push(addtocart)

      localStorage.setItem("cart" , JSON.stringify(this.cart))
      this.alertService.success('Success!!', this.options)
    }
    else {
      let addtocart = this.productList.find((product)=>{ 
        return product.id == product_id
        })
      this.cart.push(addtocart)
      localStorage.setItem("cart" , JSON.stringify(this.cart))
      // console.log(this.cart);
      this.alertService.success('Success!!', this.options)
    }
  }

}
