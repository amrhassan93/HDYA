import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { Category } from '../../models/interfaces/category'
import { RelationShip } from '../../models/interfaces/relation-ship'
import { Occassion } from '../../models/interfaces/occassion'
import { Router } from '@angular/router';

import { ProductPicture } from '../../models/interfaces/product-picture'
import { from } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  url =  new Array<string>()
  categories:Category[] = []
  occassions:Occassion[] = []
  relationships:RelationShip[] = []
  newproduct:Product;
  images:File [] = [] 
  newavatar:File 
  // name:string = "";
  // price:number = 0;
  // details:string = "";
  // age_from:number = 0;
  // age_to:number = 0;
  // gender:string = "";
  // occassions:Array<number> = [];
  // category:number = 0;
  // relationships:Array<number> = [];
  // is_featured:boolean;
  // created_at:string;
  // updated_at:string;
  // productpicture_set:Array<object>;
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
    // console.log(event);
    this.images = []
    let incoming_images =  event.target.files
    for (let i=0; i<incoming_images.length; i++){

      this.images.push(incoming_images[i])
    }

    //  if (event.target.files){
      this.url = [];
      let files = event.target.files;
      if (files) {
        for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.url.push(e.target.result);
          }
          reader.readAsDataURL(file);
        }
      }
        // var reader = new FileReader()
        // for (let i in event.target.files){
        //   reader.readAsDataURL(event.target.files[i])
        //   // reader.onload = (event:any) =>{
        //   //   this.url.push(event.target.result) 
        //   //   console.log(event);
        //   // }
        // }
        

        // console.log(this.url);
        
      // }


  }
  addNewProduct(){
    if (this.images.length >= 3){
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
    else{
      alert('please upload more than 3 images')
    }
   
  
   
  }

    
  
 
  editProduct(){

    let prd_id:any = this.newproduct.id
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
}




