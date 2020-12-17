import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  usertoken: any ;

  constructor() {

    // if (localStorage.getItem('token')){
    //   this.usertoken = localStorage.getItem("token")
    // }
    // else{
    //   console.log('no token')
    // }
    // console.log(this.usertoken);
    
   }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.usertoken = localStorage.getItem('token')
    
  }
}
