import { Component, OnInit ,OnChanges,Input } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'

@Component({
  selector: 'app-poduct-details-popup',
  templateUrl: './poduct-details-popup.component.html',
  styleUrls: ['./poduct-details-popup.component.scss']
})
export class PoductDetailsPopupComponent implements OnInit {
  @Input() productPopupID:number;

  productlist:Product[] = [];
  constructor(private _products:ProductsService) { }

  ngOnInit(): void {

    this._products.viewProducts().subscribe(
      (data)=>{
        this.productlist=data.results;
        // this.allproducts = this.productList
      },
      (err)=> console.log(err) 
    ) 
  }
  getProductsByCatID():Product[]{
    return this.productlist.filter((product)=>{
      return product.id==this.productPopupID;
    })
   }

  

}
