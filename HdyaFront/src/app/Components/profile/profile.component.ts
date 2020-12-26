import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../models/interfaces/profile'

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
  constructor(private auth:AuthenticationService , private activerouter:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    // let id = this.activerouter.snapshot.params['id']
    let usertoken = localStorage.getItem('token')
    this.auth.userProfile().subscribe(
      (data)=>this.myprofile=data,
      (err)=>console.log(err)
    )
  }
}
