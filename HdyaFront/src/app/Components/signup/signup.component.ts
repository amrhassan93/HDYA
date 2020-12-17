import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private auth:AuthenticationService , private route:Router) { 
    if (localStorage.getItem('token')){
      this.route.navigate(['/home'])
    }
  }
  // email:string;
  // password:string;
  // re_password:string;
  // first_name:string;
  // last_name:string;
  // mobile:string


  ngOnInit(): void {
  }

  UserRegester(username:string , email:string , password:string ,re_password:string, first_name:string , last_name:string  , mobile:string) {
    this.auth.register(username , email,password , re_password , first_name , last_name , mobile).subscribe(
      (data)=>  console.log(data),
      (err) => console.log(err)
    );
  }

}
