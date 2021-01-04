import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { FormControl,FormGroup ,FormArray,Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ConfirmedpasswordService} from '../../services/confirmedpassword.service'
import { Router } from '@angular/router'
import * as AOS from 'aos';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  profileForm = this.fb.group({
    firstname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
    lastname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
    email: ['',[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")]],
    username:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    mobile:['',[Validators.required,Validators.pattern("^01[0-2]{1}[0-9]{8}")]],
    password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(30)]],
    confirmpassword:['',Validators.required] },
    { 
    validator:this.confirmedPassword.passwordMatchValidator("password","confirmpassword")
      
    })

  constructor(private auth:AuthenticationService ,
              private route:Router ,
              private fb: FormBuilder,
              private confirmedPassword:ConfirmedpasswordService
              ) { 
    if (localStorage.getItem('token')){
      this.route.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    AOS.init();
  }

  UserRegester(username:string , email:string , password:string ,re_password:string, first_name:string , last_name:string  , mobile:string) {
    this.auth.register(username , email,password , re_password , first_name , last_name , mobile).subscribe(
      (data)=>  {
        alert('thanks for regester please login now')
        this.route.navigate(['/login'])
      },
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
}}
