import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/interfaces/profile';
import { AuthenticationService } from '../../services/authentication.service'
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  url:string = ''
  isdisplayed = false
  newavatar!: File;
  editparams: {[k: string]: any} = {}
  // profileList:Profile[]= [];
  


  
  toggledispayed(){
    this.isdisplayed = !this.isdisplayed
  }
  // selectfile(event:any){
  //   if (event.target.files){
  //     var reader = new FileReader()
  //     reader.readAsDataURL(event.target.files[0])
  //       reader.onload = (event:any) =>{
  //         this.url = event.target.result
  //       }
  //   }
  // }

  profileList:Profile = {
    username:"",
    first_name:"",
    last_name:"",
    address: "",
    mobile: "",
    birth_date:"",
    id: 0,
    email: "",
  
  }
 
  constructor(private auth:AuthenticationService,private activerouter:ActivatedRoute) { 

  }

  ngOnInit(): void {
    
    this.auth.userProfile().subscribe(
      (data)=> {
        this.profileList=data
        console.log(this.profileList)
      },(err)=>console.log(err))}


  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //    if(this.newavatar){
  //     this.profileList.avatar = this.newavatar
  //     console.log(this.profileList.avatar)
  //   }
  // }
 




    imageupload(event:any){
     this.newavatar = event.target.files[0]
    //  this.profileList.avatar = this.newavatar
      console.log(this.newavatar)
      if (event.target.files){
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (event:any) =>{
          this.url = event.target.result
        }
      }
    }



    updateprofile( first_name:string , last_name:string  , mobile:string,address:string,birthdate:string){
    //  console.log(first_name)
    //  console.log(first_name instanceof Array);

    //  console.log(this.newavatar)

    if (first_name){
      this.editparams.first_name = first_name
    }
    if (last_name){
      this.editparams.last_name = last_name
    }
    if (address){
      this.editparams.address = address
    }
    if (mobile){
      this.editparams.mobile = mobile
    }
    if (birthdate){
      this.editparams.birth_date = birthdate
    }

    //  let newdata={
      
    //    "first_name":first_name,
    //    "last_name":last_name,
    //    "mobile":mobile,
    //    "adress":address,
    //    "birth_date":birthdate,
                             

    //  }
     this.auth.editprofile(this.editparams).subscribe(
      (data)=>console.log(data),
      (err)=>console.log(err) 
    )
       const fd  = new FormData()
       fd.append('avatar' , this.newavatar,this.newavatar.name)

      // console.log(this.newavatar)
      // console.log(fd)
      this.auth.editprofile(fd).subscribe(
        (data)=>console.log(data),
        (err)=>console.log(err)

      )

          }

          
 
            
            
}
