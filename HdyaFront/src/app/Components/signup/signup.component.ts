import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { Validators, FormControl,FormGroup ,FormArray} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ConfirmedpasswordService} from '../../services/confirmedpassword.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
    lastName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
    email: ['',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    username:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    mobile:['',[Validators.required,Validators.pattern("^01[0-2]{1}[0-9]{8}")]],
    password:['',Validators.required],
    confirmpassword:['',Validators.required] },
    { 
    validator:this.confirmedPassword.passwordMatchValidator("password","confirmpassword")
  
    })
    


   





  constructor(private auth:AuthenticationService,private fb: FormBuilder,private confirmedPassword:ConfirmedpasswordService) { 


  constructor(private auth:AuthenticationService , private route:Router) { 
    if (localStorage.getItem('token')){
      this.route.navigate(['/home'])
    }
  }
  // email:string;
  password:string;
  re_password:string;
  first_name:string;
  last_name:string;
  mobile:string



   






  ngOnInit(): void {
  }

  UserRegester(username:string , email:string , password:string ,re_password:string, first_name:string , last_name:string  , mobile:string) {
    this.auth.register(username , email,password , re_password , first_name , last_name , mobile).subscribe(
      (data)=>  console.log(data),
      (err) => console.log(err)
    );
  }


  ConfirmedValidator(controlName: string, matchingControlName: string){

    return (formGroup: FormGroup) => {

        const control = formGroup.controls[controlName];

        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {

            return;

        }

        if (control.value !== matchingControl.value) {

            matchingControl.setErrors({ confirmedValidator: true });

        } else {

            matchingControl.setErrors(null);

        }

    }

}

