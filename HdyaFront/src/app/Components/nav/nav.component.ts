import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // usertoken: any ;

  constructor() {
    // if (localStorage.getItem('token')){
    //   this.usertoken = localStorage.getItem("token")
    // }
    // else{
    //   console.log('no token')
    // }
    // console.log(localStorage.getItem("token"));
    
   }

  ngOnInit(): void {
  }

}
