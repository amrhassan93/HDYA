import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private auth:AuthenticationService) { 
    this.email = ''
    this.password = ''
  }

  ngOnInit(): void {
  }

  UserLogin(email:string , password:string){
    this.auth.login(email,password).subscribe(
      (data)=>  localStorage.setItem("token" , data.auth_token),
      (err) => alert("Wrong User name or password")
    );
  }
}