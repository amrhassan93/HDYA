import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/interfaces/report';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductsService } from 'src/app/services/products.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  // reportProduct:Report[]=[]
  myID:number = 0
  // orders:Array<object> = []
  msgBody:string = ""


  constructor(private _products:ProductsService ,
             private activerouter:ActivatedRoute ,
             private _auth:AuthenticationService,
             @Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit(): void {
    console.log(this.data);
    

    

    // this._auth.userProfile().subscribe(
    //   (data)=>{
    //     this.myID = data.id
    //     // console.log(this.myID);
        
    //   },
    //   (err)=>console.log(err))

    // this._products.showorders().subscribe(
    //   (data)=>console.log(data),
    //   (err)=>console.log(err))



  }


  sendmsg(){
    let id = parseInt(this.data.id)
    let myID = parseInt(this.data.myID)
    this._products.Report(myID,this.msgBody ,id).subscribe(
        (data)=> {
          console.log(data);
          
           alert('Thanks for your report ')
            location.reload()
          },
        (err) => console.log(err)
      )
    // localStorage.setItem('errmsg' , this.msgBody)
  }

  // reportproduct(body:string){
    
    
  //   let id = parseInt(this.data.id)

  //   console.log(id);

  //   let found = false
  //   for(let i in this.orders ){
  //     if(this.orders[i].product == id){
  //       found = true ;
  //       break;
  //     }
  //   }

  //   console.log(found);
    




  //   if (found == true){
  //     if (this.reportProduct.length == 0){
  //       this._products.Report(this.myID,body,id).subscribe(
  //         (data)=> {
  //           alert('Thanks for your report ')
  //            location.reload()
  //          },
  //         (err) => console.log(err)
  //       )
  //     }else{
  //       let userFound = false 

  //       // 2 => 50  

  //       for(let i in this.reportProduct){
  //         if(this.reportProduct[i].user == this.myID){
  //           userFound = true
  //           break;
  //         }
  //       }

  //       if (userFound == false){
  //         this._products.Report(this.myID,body ,id).subscribe(
  //           (data)=> {
  //              alert('Thanks for your report ')
  //               location.reload()
  //             },
  //           (err) => console.log(err)
  //         )
  //       }else{
  //         alert("You can't report again")
  //       } 
  //     } 
  //   }
  //   else{
  //     alert("You Can't Report Product You didn't Try ")
  //   }
  // }



}
