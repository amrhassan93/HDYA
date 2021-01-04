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
  myID:number = 0
  msgBody:string = ""


  constructor(private _products:ProductsService ,
             @Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit(): void {
    
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
  }
}
