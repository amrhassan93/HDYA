import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../models/interfaces/profile'
import { ProductsService } from '../../services/products.service'
import { Product } from 'src/app/models/interfaces/product';
//

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  orders:Array<object> = []
  url="../../../assets/images/login.jpg"
  isdisplayed = false
  displayOrders = false
  myProducts:Product[] = []
  // onlyOrders:Product[] = []
  myOrders:Array<object> = []
  //pagination
  totalOrdersRecords: number = 0
  totalProductsRecords: number = 0
  totaloncomingOrdersRecords: number = 0
  page:number=1
  incomingOrders:Array<object> = []
  incomingOrdersToHandle:Array<object> = []
  usersList:Array<object> =[]



  toggledispayed(){
    this.isdisplayed = !this.isdisplayed
  }
  selectfile(event:any){
    if (event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
        reader.onload = (event:any) =>{
          this.url = event.target.result
        }
    }
  }
  togglePreviousOrders(){
    this.displayOrders = !this.displayOrders
  }
  myprofile:Profile = {
    username:"",
    first_name:"",
    last_name:"",
    address: "",
    mobile: "",
    avatar: "",
    birth_date:"",
    id: 0,
    email: ""
  }
  constructor(private _productService:ProductsService ,
              private auth:AuthenticationService ,
              private activerouter:ActivatedRoute) {}

  ngOnInit(): void {
    // let id = this.activerouter.snapshot.params['id']
    let usertoken = localStorage.getItem('token')
    this.auth.userProfile().subscribe(
      (data)=>this.myprofile=data,
      (err)=>console.log(err)
    )

    // this.auth.showUserById(2).subscribe(console.log,console.log)

    this._productService.showorders().subscribe(
      (data)=>{ 
        this.orders = data
        for (let i=0 ; i <this.orders.length ; i++){
          this._productService.viewProductById(this.orders[i].product).subscribe(
            (data)=>{
              // this.onlyOrders.push(data)
              this.myOrders.push({
                'No':i+1,
                'product_name' : data.name,
                'product_price' : data.price,
                'Quantity' : this.orders[i].quantity,
                'created_at' :this.orders[i].created_at,
                'Total':data.price * this.orders[i].quantity,
                'status':this.orders[i].status,
                'order_id':this.orders[i].id,
                'product_id':data.id,
              })
                //pagination
              this.totaloncomingOrdersRecords = this.myOrders.length
              
              for (let i in this.myOrders){
                if(this.myOrders[i].status == 'p'){
                  this.myOrders[i].status = 'in processing'
                }else if (this.myOrders[i].status == 's'){
                  this.myOrders[i].status = 'shipped'
                }else if (this.myOrders[i].status == 'e'){
                  this.myOrders[i].status = 'delivered'
                }else if (this.myOrders[i].status == 'r'){
                  this.myOrders[i].status = 'returned'
                }else if (this.myOrders[i].status == 'c'){
                  this.myOrders[i].status = 'cancelled'
                }
              }
             
            },
            (err)=>console.log(err)
          )
        }
      },
      (err)=>console.log(err)
    )




    // this._productService.showIncomingOrders().subscribe(
    //   (data)=>{
    //     this.incomingOrders = data
    //     console.log(this.incomingOrders);
    //     for (let i=0 ; i <this.incomingOrders.length ; i++){
    //       this._productService.viewProductById(this.incomingOrders[i].product).subscribe(
    //         (data)=>{

    //           // let user ;
    //           // this.auth.showUserById(this.incomingOrders[i].user).subscribe(
    //           //   (data)=>{
    //           //     user=data
    //           //     console.log(data)
    //           //     console.log(user)
    //           //   },
    //           //   (err)=>console.log(err)
    //           // )

    //           this.incomingOrdersToHandle.push({
    //             'No':i+1,
    //             'product_name' : data.name,
    //             'product_price' : data.price,
    //             'Quantity' : this.incomingOrders[i].quantity,
    //             'created_at' :this.incomingOrders[i].created_at,
    //             'Total':data.price * this.incomingOrders[i].quantity,
    //             'status':this.incomingOrders[i].status,
    //             'order_id':this.incomingOrders[i].id,
    //             'product_id':data.id,
    //             'user':this.incomingOrders[i].user
    //           })


    //             //pagination
    //           this.totalOrdersRecords = this.incomingOrdersToHandle.length
              
    //           for (let i in this.incomingOrdersToHandle){
    //             if(this.incomingOrdersToHandle[i].status == 'p'){
    //               this.incomingOrdersToHandle[i].status = 'in processing'
    //             }else if (this.incomingOrdersToHandle[i].status == 's'){
    //               this.incomingOrdersToHandle[i].status = 'shipped'
    //             }else if (this.incomingOrdersToHandle[i].status == 'e'){
    //               this.incomingOrdersToHandle[i].status = 'delivered'
    //             }else if (this.incomingOrdersToHandle[i].status == 'r'){
    //               this.incomingOrdersToHandle[i].status = 'returned'
    //             }else if (this.incomingOrdersToHandle[i].status == 'c'){
    //               this.incomingOrdersToHandle[i].status = 'cancelled'
    //             }
    //           }
    //           // console.log(this.incomingOrdersToHandle);
              
    //         },
    //         (err)=>console.log(err)
    //       )
    //     }
    //   } ,
    //   (err) => console.log(err)
    // )



    this._productService.myProducts().subscribe(
      (data)=>{

        this.myProducts = data 
       //pagination
       this.totalProductsRecords = this.myProducts.length 
      },
      (err)=>console.log(err)
    )
  }
  cancelOrder(order_id:number){
    this._productService.deleteOrder(order_id).subscribe(console.log,console.log)
    
  }
  
}
  

