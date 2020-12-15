import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  url="../../../assets/images/login.jpg"
  isdisplayed = false
  displayOrders = false
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

  

  constructor() { }

  ngOnInit(): void {
  }

}
