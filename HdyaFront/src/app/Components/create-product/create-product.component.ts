import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  newproduct:Product;
  // name:string;
  // price:number;
  // details:string;
  // age_from:number;
  // age_to:number;
  // gender:string;
  // occassions:Array<number>;
  // category:number;
  // relationships:Array<number>;
  // is_featured:boolean;
  // created_at:string;
  // updated_at:string;
  // productpicture_set:Array<object>;


  
  constructor(private _productservisec:ProductsService) { 
    this.newproduct = {
      gender:"m",
      details:"",
      name:"",
      category:1,
      occassions:[5,6],
      relationships:[1,2],
      is_featured:false,
      price:0,
      age_from:0,
      age_to:0,
      productpicture_set:[]
    }
    // this.gender="";
    // this.details = "";
    // this.name="" ;
    // this.category=0;
    // this.occassions=[];
    // this.relationships=[];
    // this.is_featured=false;
    // this.price=0;
    // this.age_from=0;
    // this.age_to=0;
    // this.created_at='';
    // this.updated_at='';
    // this.productpicture_set=[]
  
  }

  ngOnInit(): void {
    console.log(this.newproduct.productpicture_set instanceof Array);
  }


  addNewProduct(){
    console.log(this.newproduct)

    this._productservisec.createProduct(this.newproduct).subscribe(
      (data)=>console.log(data),
      (err)=>console.log(err)
    )
  }
  changeImageInput(event:any){
    // console.log(this.newproduct.productpicture_set instanceof Array);
    // console.log(typeof(this.newproduct.productpicture_set));
    console.log(event.target.files)
    // console.log(this.newproduct.productpicture_set);
    // console.log(typeof(this.newproduct.productpicture_set));
    // console.log(this.newproduct.productpicture_set instanceof Array);

    for (let i=0; i<event.target.files.length; i++){
      console.log(event.target.files[i]);
      this.newproduct.productpicture_set.push(event.target.files[i])
    }  
    // if(event.target.files && event.target.files[0].type.includes('image')){
      
    // }

  }


  // changeImageInput(event:any){
  //   console.log(event)
  //   // if(event.target.files && event.target.files[0].type.includes('image') ){
  //   // let reader = new FileReader()
  //   // reader.readAsDataURL(event.target.files[0])
  //   // reader.onload= (event:any)=>{
  //   // this.url = event.target.result
  //   // console.info(this.url)
  //   // }
  //   // }
  //   // else
  //   // console.log('File does not supported')
  //   } 

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
