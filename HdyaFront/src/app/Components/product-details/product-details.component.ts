import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var jQuery: any;
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { ActivatedRoute, Router } from '@angular/router';
import {  Review} from '../../models/interfaces/review'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productList:Product[] = [] ;
  filteredList:Product[]=[] ;
  // review:Review;




  productdetails:Product = {id : 0 ,
                        name : "" ,
                        price: 0,
                        details: "" , 
                        age_from : 0 ,
                        age_to:0 ,
                        gender : "", 
                        occassions: [] , 
                        category: 0 ,
                        relationships: [] ,
                        is_featured: false ,
                        created_at: "" ,
                        updated_at: "" ,
                        images:[]
                      };
                           
  

  constructor(private _products:ProductsService , private activerouter:ActivatedRoute) {
    // this.review = {
    //   body:"",
    //   rate:0,
    //   product_id:0
    // }
   }

  ngOnInit(): void {
    jQuery('.owl-carousel').owlCarousel(); 
    AOS.init();
    let id = this.activerouter.snapshot.params['id']
    this._products.viewProductById(id).subscribe(
      (data)=>this.productdetails=data.results,

      (err)=> console.log(err) 
    ) 

    this._products.viewProducts().subscribe(
      (data)=> {
        this.productList=data.results
        console.log(this.productList);

      },
      (err)=> console.log(err),
    )

    // (data)=>this.productdetails=data.results,

    
      // this.filteredList = this.productList.filter((product)=> product.category == this.productdetails.category)
      
      
      
  }

  // reviewFun(body:string , rate:number ){
  //   this._products.ReviewProduct(body , rate ,this.productdetails.id).subscribe(
  //     (data)=>  console.log(data),
  //     (err) => console.log(err)
  //   )
  // }


  
ngDoCheck(): void {
  //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //Add 'implements DoCheck' to the class.
  // console.log(this.productList);
  // this.filteredList = this.productList.filter((product)=> product.category == this.productdetails.category)

  // console.log(this.filteredList);
} 


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 1
      }
    },
    nav: true
  }

}
