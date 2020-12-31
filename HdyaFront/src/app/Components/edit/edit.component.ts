import { Component, OnInit } from '@angular/core';
import { AnyAaaaRecord } from 'dns';
import {AuthenticationService} from '../../services/authentication.service'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  url="../../../assets/images/login.jpg"
  isdisplayed = false

  avatar:File
  
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

  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
  }


  changeavatar(event:any){
    this.avatar = event.target.files[0]
    console.log(this.avatar);
    
  }

  update(){
    const fd = new FormData()
    fd.append('avatar' , this.avatar)

    this.auth.editprofile(fd).subscribe(
      (data)=> console.log(data),
      (err)=> console.log(err),
      )
  }

}
