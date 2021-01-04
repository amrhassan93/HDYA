import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  email:string = ""
  constructor(private _auth:AuthenticationService) { }

  ngOnInit(): void {
  }

  reset(){
    this._auth.resetPassword(this.email).subscribe(
      (data)=>{alert("Check Your Email") }, console.log)
  }

}
