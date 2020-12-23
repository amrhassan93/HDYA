import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  productList: Product[] = [];

  constructor(private _products:ProductsService) {}

  ngOnInit(): void {
    AOS.init();
    this._products.viewProducts().subscribe(
      // (data)=>this.productList=data.results,
      (err)=> console.log(err) 
    )      
    console.log(this.productList);
    
  }
}
