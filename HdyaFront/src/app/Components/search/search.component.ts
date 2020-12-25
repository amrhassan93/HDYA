import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { Category } from '../../models/interfaces/category'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  // allproducts: Product[] = [];
  productList: Product[] = [];
  categoryList:Category[]=[];
  filterdProducts:Product[] = [];
  minrange:number = 10;
  maxrange:number=70;
  minprice:number=0;
  maxprice:number=1000;




  constructor(private _products:ProductsService) {}

  ngOnInit(): void {
    AOS.init();

    if(localStorage.getItem('products')){

      let searchProducts = localStorage.getItem('products')
      // console.log(searchProducts instanceof Array);
      
      this.productList = JSON.parse(searchProducts || '{}')
      localStorage.removeItem('products')
    }
    else {
      this._products.viewProducts().subscribe(
        (data)=>{
          this.productList=data;
          // this.allproducts = this.productList
        },
        (err)=> console.log(err) 
      )    
    }

  
    // console.log(this.productList);


    this._products.showcategories().subscribe(
      (data)=>this.categoryList = data,
      (err) => console.log(err) 
    )

  }

  ngDoCheck(): void {
  
    if(localStorage.getItem('products')){

      let searchProducts = localStorage.getItem('products')
      // console.log(searchProducts instanceof Array);
      
      this.productList = JSON.parse(searchProducts || '{}')
      localStorage.removeItem('products')
    }   
    
    
  }

  resetFilters(){
    this._products.viewProducts().subscribe(
      (data)=>{
        this.productList=data;
        // this.allproducts = this.productList
      },
      (err)=> console.log(err) 
    )   
  }


  showProductsbyID(catId:number){
    for (let i=0 ; i<this.productList.length ; i++){
       if (this.productList[i].category == catId){
          this.filterdProducts.push(this.productList[i])
       }
       else{
         console.log('not in this cat')
       }
    }
    this.productList = this.filterdProducts
    this.filterdProducts = []

  }


  getproductsbygender(gender:string){
      for (let i=0 ; i<this.productList.length ; i++){
        if (this.productList[i].gender == gender){
           this.filterdProducts.push(this.productList[i])
        }
        else{
          console.log('not in this cat')
        }
     }
     this.productList = this.filterdProducts
     this.filterdProducts = []

    // if (this.allproducts.length == this.productList.length){

    // }else{
    //   this.productList = this.allproducts
    //   for (let i=0 ; i<this.productList.length ; i++){
    //       if (this.productList[i].gender == gender){
    //         this.filterdProducts.push(this.productList[i])
    //       }
    //       else{
    //         console.log('not in this cat')
    //       }
    //   }
    //   this.productList = this.filterdProducts
    //   this.filterdProducts = []
    // }


    

  }


  getproductsbyprice(minprice:number , maxprice:number ){
    for (let i=0 ; i<this.productList.length ; i++){
      if (this.productList[i].price >= minprice && this.productList[i].price <= maxprice){
         this.filterdProducts.push(this.productList[i])
      }
      else{
        console.log('not in this cat')
      }
   }
   this.productList = this.filterdProducts
   this.filterdProducts = []

  }

  getproductsbyage(age_from:number,age_to:number){
    for (let i=0 ; i<this.productList.length ; i++){
      if (this.productList[i].age_from >= age_from && this.productList[i].age_to <= age_to){
         this.filterdProducts.push(this.productList[i])
      }
      else{
        console.log('not in this cat')
      }
   }
   this.productList = this.filterdProducts
   this.filterdProducts = []
  }

  search(searchKey:string){

    for (let i = 0 ; i < this.productList.length ; i++){
      if (this.productList[i].name.toLowerCase().includes(searchKey.toLowerCase())){
        this.filterdProducts.push(this.productList[i])
      }else{
        console.log('this is not in products');
      }
    }

    this.productList = this.filterdProducts
    this.filterdProducts = []
     console.log(this.productList)
  }

}
 

