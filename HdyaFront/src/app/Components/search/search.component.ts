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
  cart:Array<object> = [];
  productPopUp:Product[] = [] ; 
  relationships: any;
  occassions: any;
  moreData:Product[]= []
  searchparams: {[k: string]: any} = {}

  filteredrelations:number = 0
  filteredoccassions:number = 0

  fromsearch:boolean = false

  options = {
    autoClose: true,
    keepAfterRouteChange: true
};

totalRecords:Number=0
page:Number=1


  constructor(private _products:ProductsService,
              protected alertService: AlertService ,
              private _addCart:AddToCartService) {}
  
  ngOnInit(): void {
    AOS.init();

    if(localStorage.getItem('searchKey')){
      this.searchparams.name = localStorage.getItem('searchKey') ; 
      this.searchNow()
      localStorage.removeItem('searchKey')
    }else if(localStorage.getItem('catsearch')){
      this.searchparams.category =JSON.parse(localStorage.getItem('catsearch') || '{}'); 
      this.searchNow()
      localStorage.removeItem('catsearch')
    }else{
      this.showAll() 
    }

    this._products.showcategories().subscribe(
      (data)=>this.categoryList = data,
      (err) => console.log(err) 
    )
    this._products.showrelations().subscribe(
      (data)=>this.relationships=data,
      (err)=>console.log(err) 
    )

    this._products.showoccassions().subscribe(
      (data)=>this.occassions=data,
      (err)=>console.log(err) 
    )
  }

  showAll(){
    this._products.viewProducts().subscribe(
      (data)=>{
        this.productList=data;
        this.moreData = data
         //pagination
         this.totalRecords = this.productList.length

      },
      (err)=> console.log(err) 
    )    
  }
  
  ngDoCheck(): void {
  
    if(localStorage.getItem('searchKey')){
      this.searchparams.name = localStorage.getItem('searchKey') ; 
      this.searchNow()
      localStorage.removeItem('searchKey')
    }   
    
  }

  resetFilters(){
    this.showAll();
    this.searchparams = {}
    this.fromsearch = false
    location.reload()
  }
  

  showProductsbyID(catId:number){
    this.searchparams.category = catId ; 
   
  }
  getproductsbygender(gender:string){

    this.searchparams.gender = gender
  }

  maxPrice(maxprice:number){
    this.searchparams.max_price = maxprice
  }
  minPrice(minprice:number){
    this.searchparams.min_price = minprice
  }

  minAge(minage:number){
    this.searchparams.min_age = minage
  }

  maxAge(maxage:number){
    this.searchparams.max_age = maxage
  }

  occassionSearch(){
    this.searchparams.occassions = this.filteredoccassions    
  }

  relationSearch(){
    this.searchparams.relationships = this.filteredrelations
  }

  searchNow(){
    this._products.searchProducts(this.searchparams).subscribe(
      (data)=>{
        console.log(data);
        if(data.length > 0){
          this.productList = data
          console.log(data);
          this.moreData = []
          this.fromsearch = true
        }else{
          this.alertService.error('NO Results Found!!', this.options)
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


  addToCart(product_id:number , qntty:number){
    this._addCart.addCart(product_id , qntty)
  }
  
  popUpProduct(product_id:number){
    this.productPopUp =  this.productList.find((product)=>{ 
      return product.id == product_id
      })
  }

  showMore(){

    if (this.moreData.next){
      this._products.viewProductsByPage(this.moreData.next).subscribe(
        (data)=>{
          console.log(data)
          this.moreData = data
          this.productList=data.results
          console.log(this.productList);
        },
        (err)=>console.log(err)
      )
    }else {
      this.alertService.warn('There is no more !!', this.options)
    }
  }

  showless(){
    if (this.moreData.previous){
      this._products.viewProductsByPage(this.moreData.previous).subscribe(
        (data)=>{
          console.log(data)
          this.moreData = data
          this.productList=data
          console.log(this.productList);
        },
        (err)=>console.log(err)
      )
    }
    else{
      this.alertService.warn('There is no previous !!', this.options)
    }
    
  }

}
