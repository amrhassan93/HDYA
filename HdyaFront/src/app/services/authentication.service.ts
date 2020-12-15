import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { 

  }

  login(email:string,password:string):Observable<any>{
    return this.http.post<any>("http://127.0.0.1:8000/auth/token/login/" , {email:email , password : password})
  }
}
