import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Category } from '../../models/interfaces/category'
import { Product } from '../../models/interfaces/product'
import { AddToCartService } from '../../services/add-to-cart.service'

declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  saleList:Product[] = []
  categoryList:Category[]=[];
  products:Product[]=[];
  allproducts:Product[]=[]
  productparams: {[k: string]: any} = {}


  constructor(private _products:ProductsService , private _addCart:AddToCartService)   { }

  ngOnInit(){
    AOS.init();
    this._products.showcategories().subscribe(
      (data)=>this.categoryList = data.results,
      (err) => console.log(err) 
    )

    let list = [1,2,3,4,5,6]
    for (let i in list){
      this._products.viewProductById(list[i]).subscribe(
        (data)=>this.saleList.push(data),
        (err)=>console.log(err)

      )
    }

  }
  catSearch(catId:number){
    localStorage.setItem('catsearch' ,JSON.stringify(catId) )
  }

  add(product_id:number){
    this._addCart.addCart(product_id)
  }

}
