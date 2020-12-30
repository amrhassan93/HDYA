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
      // console.log(incoming_images[i]);

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


}


// name:string,details:string, price:number, age_from:number, age_to:number, gender:string, category:string

// {
//   "details":"asdasd",
//   "name":"asdas dasd",
//   "category":1,
//   "occassions":[1,2],
//   "relationships":[3,2],
//   "price":125,
//   "age_from":2,
//   "age_to":15,
//   "productpicture_set":[{"image":null}, {"image":null}]
//   } 



// ===================================================================================


// import { IProduct } from './../../classes/iproduct';
// import { ProductService } from 'src/app/services/product.service';
// import { ICategory } from './../../classes/icategory';
// import { CategoryService } from './../../services/category.service';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient, HttpHeaders } from '@angular/common/http'
// @Component({
//   selector: 'app-add-new-product',
//   templateUrl: './add-new-product.component.html',
//   styleUrls: ['./add-new-product.component.css']
// })
// export class AddNewProductComponent implements OnInit {
//   selectedFiles: File[] = [];

//   constructor(private _fb:FormBuilder, private _http:HttpClient) { }

//   ngOnInit(): void {
//   }
//   onFileSelected(event){
//     console.log(event);
//     for(let i in event.target.files)
//       this.selectedFiles.push(event.target.files[i])

//   }
//   onUpload(){
//     const headers = {
//       headers:new HttpHeaders({
//         'Authorization': 'Token 508b22e480a3d2f271c028e58c606c0677f737cf'
//       })
//     }
//     const fb = new FormData()
    
//     for(let file in this.selectedFiles)
//       fb.append('image', file, file.name)
//     // fb.append('product', '53')

//     this._http.post('http://localhost:8000/products/', fb, headers).subscribe(
//       console.log,
//       res=>console.error(res.error)
//     )
//   }
// }