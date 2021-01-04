import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { AlertService } from 'src/app/_alert';


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  email:string = ""
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};
  constructor(private _auth:AuthenticationService,protected alertService: AlertService) { }

  ngOnInit(): void {
  }

  reset(){
    this._auth.resetPassword(this.email).subscribe(
      (data)=>{this.alertService.info('Check Your Email !!', this.options) }, console.log)
  }

}
