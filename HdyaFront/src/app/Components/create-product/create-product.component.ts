import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { Category } from '../../models/interfaces/category'
import { RelationShip } from '../../models/interfaces/relation-ship'
import { Occassion } from '../../models/interfaces/occassion'
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';

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
 
  edit:boolean = false

  avatar:File[] = []

  ageError:boolean = false

  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  constructor(private _productservisec:ProductsService ,  private route:Router , protected alertService: AlertService) { 
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

    if(!localStorage.getItem('token')){
      alert('Please Log in To create Your product')
      this.route.navigate(['/login'])
    }


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
    this.images = []
    let incoming_images =  event.target.files
    for (let i=0; i<incoming_images.length; i++){

      this.images.push(incoming_images[i])
    }

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
  }

  addNewProduct(){
    if (this.images.length >= 3 && this.newproduct.age_from < this.newproduct.age_to ){
      this._productservisec.createProduct(this.newproduct).subscribe(
        (data)=>{
          const fd : FormData = new FormData()
          
          for(let i=0 ; i < this.images.length ; i++){
            fd.append('image' , this.images[i] , this.images[i].name)
            fd.append('product' , data.id)
            this._productservisec.createProductImages(fd).subscribe(
              (data)=>console.log("Ok"),
              (err)=>console.log(err),
            )
          };
          this.ageError = false
          alert('Your Product Was submitted successfully');

          this.route.navigate([`/productdetails/${data.id}`]) 
        },
        (err)=>console.log(err)
      )
    }
    else{
      this.alertService.error('Wrong data, Please check your data again', this.options)
      this.ageError = true
    }
  }

    
  ageCheck(age_from:number , age_to:number){
    if (age_from > age_to){
      this.ageError = true
    }else{
      this.ageError = false
    }
  }
 
  editProduct(){

    let prd_id:any = this.newproduct.id
    this._productservisec.editProduct(prd_id , this.newproduct).subscribe(
      (data)=>{
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
    localStorage.removeItem('editprd')
  }

  delimg(img_id:number){ 
    this._productservisec.deletimg(img_id).subscribe(
      (data) => {
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




