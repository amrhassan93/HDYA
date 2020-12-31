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
  // newproduct:Product | undefined;
  // minrange:number = 10;
  // maxrange:number=70;
  // minprice:number=0;
  // maxprice:number=1000;
  
  cart:Array<object> = [];
  productPopUp:Product[] = [] ; 
  relationships: any;
  occassions: any;
  moreData:Product[]= []
  searchparams: {[k: string]: any} = {}

  filteredrelations:number = 0
  filteredoccassions:number = 0


  options = {
    autoClose: true,
    keepAfterRouteChange: false
};


  constructor(private _products:ProductsService,
              protected alertService: AlertService ,
              private _addCart:AddToCartService) {}
  
  ngOnInit(): void {
    AOS.init();

    if(localStorage.getItem('products')){
      let searchProducts = localStorage.getItem('products')
      this.productList = JSON.parse(searchProducts || '{}')
      localStorage.removeItem('products')
    }
    else {
      this.showAll() 
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

  showAll(){
    this._products.viewProducts().subscribe(
      (data)=>{
        this.productList=data.results;
        this.moreData = data
      },
      (err)=> console.log(err) 
    )    
  }
  

  ngDoCheck(): void {
  
    if(localStorage.getItem('products')){
      let searchProducts = localStorage.getItem('products')
      this.productList = JSON.parse(searchProducts || '{}')
      localStorage.removeItem('products')
    }   
    
    
  }

  resetFilters(){
    this.showAll();
    this.searchparams = {}
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

  maxPrice(maxprice:number){
    this.searchparams.max_price = maxprice

    console.log(this.searchparams);
  }
  minPrice(minprice:number){
     
    // this.searchparams.push({'price':minprice})
    this.searchparams.min_price = minprice
    // this.searchparams.max_price = maxprice

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

  minAge(minage:number){
    this.searchparams.min_age = minage

    console.log(this.searchparams);
  }

  maxAge(maxage:number){
    this.searchparams.max_age = maxage

    console.log(this.searchparams);
  }

  occassionSearch(){
    this.searchparams.occassions = this.filteredoccassions
    console.log(this.searchparams);
    
  }

  relationSearch(){


    this.searchparams.relationships = this.filteredrelations
    console.log(this.searchparams);
    
  }

  
  // getproductsbyage(age_from:number,age_to:number){
  //   this.searchparams.min_age = age_from ; 
  //   this.searchparams.max_age = age_to ; 

  // //   for (let i=0 ; i<this.productList.length ; i++){
  // //     if (this.productList[i].age_from >= age_from && this.productList[i].age_to <= age_to){
  // //        this.filterdProducts.push(this.productList[i])
  // //     }
  // //     else{
  // //       console.log('not in this cat')
  // //     }
  // //  }
  // //  this.productList = this.filterdProducts
  // //  this.filterdProducts = []
  // }

  searchNow(){
    this._products.searchProducts(this.searchparams).subscribe(
      (data)=>{
        console.log(data);
        if(data.length > 0){
          this.productList = data
          this.moreData = []
        }else{
          alert("NO Results Found")
          this.showAll()
        }
       
      },
      (err)=>console.log(err)
      
    )  
  }

  

  // search(searchKey:string){

  //   for (let i = 0 ; i < this.productList.length ; i++){
  //     if (this.productList[i].name.toLowerCase().includes(searchKey.toLowerCase())){
  //       this.filterdProducts.push(this.productList[i])
  //     }else{
  //       console.log('this is not in products');
  //     }
  //   }

  //   this.productList = this.filterdProducts
  //   this.filterdProducts = []
  //    console.log(this.productList)
  // }


  addToCart(product_id:number){
    this._addCart.addCart(product_id)
  }
  
  popUpProduct(product_id:number){
    this.productPopUp =  this.productList.find((product)=>{ 
      return product.id == product_id
      })

    // console.log(this.productPopUp);
  }
  
  showMore(){

    if (this.moreData.next){
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
    }else {
      alert('there is no more')
    }

    
  }

  showless(){
    if (this.moreData.previous){
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
    else{
      alert('there is no previous')

    }
    
  }

}
