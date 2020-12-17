import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { ActivatedRoute, Router } from '@angular/router';


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

  

  constructor(private auth:AuthenticationService , private activerouter:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    let id = this.activerouter.snapshot.params['id']
    this.auth.userProfile(id).subscribe(
      (data)=>console.log(data),
      (err)=>console.log(err)
    )
  }
}
