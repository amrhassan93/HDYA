import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { Category } from '../../models/interfaces/category'
import { AlertService } from 'src/app/_alert';
import { AddToCartService } from '../../services/add-to-cart.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  productList: Product[] = [];
  categoryList:Category[]=[];
  filterdProducts:Product[] = [];
  newproduct:Product | undefined;
  minrange:number = 10;
  maxrange:number=70;
  minprice:number=0;
  maxprice:number=1000;
  totalRecords: number | undefined
  page:number=1
  cart:Array<object> = [];
  productPopUp:Product[] = [] ; 
  relationships: any;
  occassions: any;
  moreData:Product[]= []
  searchparams: {[k: string]: any} = {}

  options = {
    autoClose: true,
    keepAfterRouteChange: false
};


  constructor(private _products:ProductsService,protected alertService: AlertService , private _addCart:AddToCartService) {
    this.newproduct = {
      gender:"",
      details:"",
      name:"",
      category:0,
      occassions:[],
      relationships:[],
      is_featured:false,
      price:0,
      age_from:0,
      age_to:0,
    } 
    // this.searchparams = {
    //   gender = '',

    // }
  }
  
  ngOnInit(): void {
    AOS.init();

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


  

  ngDoCheck(): void {
  
    if(localStorage.getItem('products')){

      let searchProducts = localStorage.getItem('products')
      // console.log(searchProducts instanceof Array);
      
      this.productList = JSON.parse(searchProducts || '{}')
      this.totalRecords = this.productList.length
      localStorage.removeItem('products')
    }   
    
    
  }

  resetFilters(){
    this._products.viewProducts().subscribe(
      (data)=>{
        this.searchparams = {}
        this.productList=data.results;
        this.totalRecords = data.results.length
        // this.allproducts = this.productList
      },
      (err)=> console.log(err) 
    )   
  }
  

  showProductsbyID(catId:number){
    this.searchparams.category = catId ; 
    console.log(this.searchparams);

    // for (let i=0 ; i<this.productList.length ; i++){
    //    if (this.productList[i].category == catId){
    //       this.filterdProducts.push(this.productList[i])
    //    }
    //    else{
    //      console.log('not in this cat')
    //    }
    // }
    // this.productList = this.filterdProducts
    // this.filterdProducts = []

  }


  getproductsbygender(gender:string){

    this.searchparams.gender = gender
    console.log(this.searchparams);


    //   for (let i=0 ; i<this.productList.length ; i++){
    //     if (this.productList[i].gender == gender){
    //        this.filterdProducts.push(this.productList[i])
    //     }
    //     else{
    //       console.log('not in this cat')
    //     }
    //  }
    //  this.productList = this.filterdProducts
    //  this.filterdProducts = []
  }

  getproductsbyprice(minprice:number , maxprice:number ){
     
    // this.searchparams.push({'price':minprice})
    this.searchparams.price = minprice

    console.log(this.searchparams);

  //   for (let i=0 ; i<this.productList.length ; i++){
  //     if (this.productList[i].price >= minprice && this.productList[i].price <= maxprice){
  //        this.filterdProducts.push(this.productList[i])
  //     }
  //     else{
  //       console.log('not in this cat')
  //     }
  //  }
  //  this.productList = this.filterdProducts
  //  this.filterdProducts = []

  }

  searchNow(){
    // for (let i in this.searchparams){
      
    // }
    // this.searchparams
    this._products.viewProductsBycat(this.searchparams).subscribe(
      (data)=>this.productList = data.results,
      (err)=>console.log(err)
      
    )  
  }

  getproductsbyage(age_from:number,age_to:number){
    this.searchparams.age_from = age_from ; 
    this.searchparams.age_to = age_to ; 

  //   for (let i=0 ; i<this.productList.length ; i++){
  //     if (this.productList[i].age_from >= age_from && this.productList[i].age_to <= age_to){
  //        this.filterdProducts.push(this.productList[i])
  //     }
  //     else{
  //       console.log('not in this cat')
  //     }
  //  }
  //  this.productList = this.filterdProducts
  //  this.filterdProducts = []
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


  addToCart(product_id:number){
    this._addCart.addCart(product_id)
    // if (localStorage.getItem("cart")){
    //   this.cart = JSON.parse(localStorage.getItem("cart") || '{}') 

    //   let addtocart = this.productList.find((product)=>{ 
    //     return product.id == product_id
    //     })

    //   this.cart.push(addtocart)

    //   localStorage.setItem("cart" , JSON.stringify(this.cart))
    //   this.alertService.success('Success!!', this.options)
    // }
    // else {
    //   let addtocart = this.productList.find((product)=>{ 
    //     return product.id == product_id
    //     })
    //   this.cart.push(addtocart)
    //   localStorage.setItem("cart" , JSON.stringify(this.cart))
    //   // console.log(this.cart);
    //   this.alertService.success('Success!!', this.options)
    // }
  }
  popUpProduct(product_id:number){
    this.productPopUp =  this.productList.find((product)=>{ 
      return product.id == product_id
      })

    console.log(this.productPopUp);

  }

  showMore(){
    this._products.viewProductsByPage(this.moreData.next).subscribe(
      (data)=>{
        console.log(data)
        this.moreData = data
        // for (let i in data.results){
        //   this.productList.push(data.results[i])
        // }
        this.productList=data.results
        console.log(this.productList);
      },
      (err)=>console.log(err)
    )
  }

  showless(){
    this._products.viewProductsByPage(this.moreData.previous).subscribe(
      (data)=>{
        console.log(data)
        this.moreData = data
        // for (let i in data.results){
        //   this.productList.push(data.results[i])
        // }
        this.productList=data.results
        console.log(this.productList);
      },
      (err)=>console.log(err)
    )
  }

}
