import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { state, style, transition, trigger ,animate,group,keyframes} from '@angular/animations';
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Category } from '../../models/interfaces/category'
import { Product } from '../../models/interfaces/product'


declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})





export class HomeComponent implements OnInit {
  // loader:boolean = true


  saleList:Product[] = []

  categoryList:Category[]=[];
  products:Product[]=[];
  allproducts:Product[]=[]
  productparams: {[k: string]: any} = {}


  constructor(private _products:ProductsService) { }

  ngOnInit(){
    // jQuery('.owl-carousel').owlCarousel(); 
    AOS.init();
    this._products.showcategories().subscribe(
      (data)=>this.categoryList = data.results,
      (err) => console.log(err) 
    )

    // this._products.viewProducts().subscribe(
    //   (data)=>this.products = data.results,
    //   (err) => console.log(err) 
    // )
    let list = [1,2,3,4,5,6]
    for (let i in list){
      this._products.viewProductById(list[i]).subscribe(
        (data)=>this.saleList.push(data),
        (err)=>console.log(err)

      )
    }
    

    

    // setTimeout(()=>{
    //   this.loader = false
    // },3000)
  }

  


  // showCategories(){
  //   this._products.viewProducts().subscribe(
  //     (data)=>this.allproducts = data.results,
  //     (err) => console.log(err) 
  //   )
  // }

 
  catSearch(catId:number){
    localStorage.setItem('catsearch' ,JSON.stringify(catId) )
  }

  // latestFiveProducts(){
  //   this.products.sort()
  // }


  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: true,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 1
  //     }
  //   },
  //   nav: true
  // }

}
