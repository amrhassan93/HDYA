import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var jQuery: any;
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { Occassion } from '../../models/interfaces/occassion'
import { RelationShip } from '../../models/interfaces/relation-ship'
import { ActivatedRoute, Router } from '@angular/router';
import {  Review} from '../../models/interfaces/review'
import { AddToCartService } from '../../services/add-to-cart.service'
import { AuthenticationService } from '../../services/authentication.service'
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  myID:number = 0
  orders:Array<object> = []
  occassionList:Occassion[] = [];
  filterdoccassionList:Occassion[] = [];
  relList:RelationShip[] = [];
  filterdrelList:RelationShip[] = [];
  reviewList:Review[]=[]
  productPopUp:Product[] = [] ; 
  countOfReviews:number=0;
  avrOfReviews:number=0
  productList:Product[] = [] ;
  filteredList:Product[]=[] ;
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
                           
  constructor(private _products:ProductsService ,
              private activerouter:ActivatedRoute,
              private _addCart:AddToCartService,
              private _auth:AuthenticationService,
              private route:Router
            
      ) { }

  ngOnInit(): void {
    jQuery('.owl-carousel').owlCarousel(); 
    AOS.init();
    let id = this.activerouter.snapshot.params['id']

    this._auth.userProfile().subscribe(
      (data)=>{
        this.myID = data.id
        console.log(this.myID);
        
      },
      (err)=>console.log(err)
      
    )

    this._products.showoccassions().subscribe(
      (data)=>this.occassionList=data.results,
      (err)=>this.occassionList=err
    )
      
    this._products.showrelations().subscribe(
      (data)=>this.relList=data.results,
      (err)=>console.log(err)
    )


    this._products.viewProductById(id).subscribe(
      (data)=>{
      // console.log(this.occassionList);
        this.productdetails=data
        for (let i =0; i < this.productdetails.occassions.length ; i++){
          this.filterdoccassionList.push(this.occassionList.find((occ)=>occ.id == this.productdetails.occassions[i]));
          
        }
        for (let i =0; i < this.productdetails.relationships.length ; i++){
          this.filterdrelList.push(this.relList.find((rel)=>rel.id == this.productdetails.relationships[i]));
          
        }
        // console.log(this.filterdoccassionList);
      },
      (err)=> console.log(err) 
    ) 
   

    this._products.viewProducts().subscribe(
      (data)=> {
        this.productList=data.results
        // console.log(this.productList);

      },
      (err)=> console.log(err),
    )
    this._products.showreviews(id).subscribe(
      (data)=> {
        // console.log(data);
        this.reviewList = data
        // console.log(this.reviewList);
        this.countOfReviews = this.reviewList.length
        let onlyReviews = []
        for(let i=0 ; i<this.reviewList.length ; i++){
          onlyReviews.push(this.reviewList[i].rate)
        } 
        var sum = onlyReviews.reduce(function(a, b){
          return a + b;
        }, 0);

        console.log(sum);
        
        // console.log(this.reviewList);
        // console.log(onlyReviews);
        // console.log(onlyReviews);
        if (sum!=0){
        this.avrOfReviews = sum / onlyReviews.length;
        }
        // console.log(this.avrOfReviews);
        // console.log(sum);

      },
      (err)=> console.log(err),
       )
      
      this._products.showorders().subscribe(
        (data)=> this.orders = data,
        (err)=>console.log(err)
      )

      
  }
  popUpProduct(product_id:number){
    this.productPopUp =  this.productList.find((product)=>{ 
      return product.id == product_id
      })

    console.log(this.productPopUp);
  }
  
  reviewFun(body:string , rate:number ){
    let id = this.activerouter.snapshot.params['id']
    let found = false
    for(let i in this.orders ){
      if(this.orders[i].product == id){
        found = true ;
        break;
      }
    }

    if (found == true){
      if (this.reviewList.length == 0){
        this._products.ReviewProduct(body , rate ,this.productdetails.id).subscribe(
          (data)=>  console.log(data),
          (err) => console.log(err)
        )
      }else{
        for(let i in this.reviewList){
          if(this.reviewList[i].user != this.myID){
              this._products.ReviewProduct(body , rate ,this.productdetails.id).subscribe(
              (data)=>  console.log(data),
              (err) => console.log(err)
            )
          }
        }
        alert("You can't review again")
      }

      
    }
    else{
      alert("You Can't Review Product You didn't Try ")
    }
  }

  // showProductsbyID(catId:number){
  //   for (let i=0 ; i<this.productList.length ; i++){
  //      if (this.productList[i].category == catId){
  //         this.filterdProducts.push(this.productList[i])
  //      }
  //      else{
  //        console.log('not in this cat')
  //      }
  //   }
  //   this.productList = this.filterdProducts
  //   this.filterdProducts = []
  // }
  
ngDoCheck(): void {
  //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //Add 'implements DoCheck' to the class.
  // console.log(this.productList);
  this.filteredList = this.productList.filter((product)=> product.category == this.productdetails.category)
  
} 

addToCart(){
  let id = this.activerouter.snapshot.params['id']
  this._addCart.addCart(id)
}

editPrd(prd_id:number){
  localStorage.setItem('editprd',JSON.stringify(prd_id))
  this.route.navigate(['/product/createproduct'])
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


