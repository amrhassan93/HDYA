import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var jQuery: any;
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productdetails:Product = {id : 0 ,
                        name : "" ,
                        price: 0,
                        details: "" , 
                        img: "" ,
                        age_from : 0 ,
                        age_to:0 ,
                        gender : "", 
                        occassions: "" , 
                        category: "" ,
                        catId: 0 ,
                        relationships: "" ,
                        is_featured: false ,
                        created_at: "" ,
                        updated_at: "" ,
                      };
                           
  constructor(private _products:ProductsService , private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
    jQuery('.owl-carousel').owlCarousel(); 
    AOS.init();
    let id = this.activerouter.snapshot.params['id']
    this._products.viewProductById(id).subscribe(
      (data)=>this.productdetails=data,
      (err)=> console.log(err) 
    ) 


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
