import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { Category } from '../../models/interfaces/category'
import { RelationShip } from '../../models/interfaces/relation-ship'
import { Occassion } from '../../models/interfaces/occassion'
import { Router } from '@angular/router';

import { ProductPicture } from '../../models/interfaces/product-picture'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  categories:Category[] = []
  occassions:Occassion[] = []
  relationships:RelationShip[] = []
  newproduct:Product;
  images:File [] = [] 
  edit:boolean = false

  avatar:File[] = []

  constructor(private _productservisec:ProductsService ,  private route:Router) { 
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
  }

  ngOnInit(): void {
    this._productservisec.showcategories().subscribe(
      (data)=>this.categories=data.results,
      (err)=>console.log(err) 
    )

    this._productservisec.showrelations().subscribe(
      (data)=>this.relationships=data.results,
      (err)=>console.log(err) 
    )

    this._productservisec.showoccassions().subscribe(
      (data)=>this.occassions=data.results,
      (err)=>console.log(err) 
    )


    if (localStorage.getItem('editprd')){
      let prdId =JSON.parse(localStorage.getItem('editprd') || '{}')
      this._productservisec.viewProductById(prdId).subscribe(
        data => {
          this.newproduct = (data)
          this.edit = true
        },
        err => console.log((err))
      )

    }

  }
  changeImageInput(event:any){
   
    let incoming_images =  event.target.files
    for (let i=0; i<incoming_images.length; i++){

      this.images.push(incoming_images[i])
    }
  }
  // name:string,details:string, price:number, age_from:number, age_to:number, gender:string, category:number , occassions:Array<number> , relationships:Array<number>
  addNewProduct(){

    this._productservisec.createProduct(this.newproduct).subscribe(
      (data)=>{
        const fd : FormData = new FormData()
        
        for(let i=0 ; i < this.images.length ; i++){
          fd.append('image' , this.images[i] , this.images[i].name)
          fd.append('product' , data.id)
          this._productservisec.createProductImages(fd).subscribe(
            (data)=>console.log(data),
            (err)=>console.log(err),
          )
        };
        alert('Your Product Was submitted successfully');
        this.route.navigate([`/productdetails/${data.id}`]) 
      },
      (err)=>console.log(err)
    )
  }

  
 
  editProduct(){

    let prd_id:number = this.newproduct.id
    this._productservisec.editProduct(prd_id , this.newproduct).subscribe(
      (data)=>{
        console.log(data);
        localStorage.removeItem('editprd')
        this.edit = false
      },
      (err)=>console.log(err),     
    )

    const fd : FormData = new FormData()
    for(let i=0 ; i < this.images.length ; i++){
      fd.append('image' , this.images[i] , this.images[i].name)
      fd.append('product' , prd_id)
      this._productservisec.createProductImages(fd).subscribe(
        (data)=>console.log(data),
        (err)=>console.log(err),
      )
    };
    alert('Your Product Was submitted successfully');
    this.route.navigate([`/productdetails/${prd_id}`]) 
    
  }

  delimg(img_id:number){ 
    this._productservisec.deletimg(img_id).subscribe(
      (data) => {
        console.log(data)

        let prdId =JSON.parse(localStorage.getItem('editprd') || '{}')
        this._productservisec.viewProductById(prdId).subscribe(
        data => {
          this.newproduct = (data)
          this.edit = true
        },
        err => console.log((err))
      )
      },
      (err) => console.log(err)

    )
  }


  cancel(){
    let id = this.newproduct.id
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
    localStorage.removeItem('editprd')
    this.route.navigate([`/productdetails/${id}`]) 

  }


  imgtest(event:any){
    this.avatar = event.target.files[0]
  }

  test(){
    const fd = new FormData();
    fd.append('avatar' , this.avatar[0]) 
    console.log(fd);
    
  }


}



