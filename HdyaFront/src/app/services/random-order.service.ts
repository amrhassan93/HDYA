import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomOrderService {
  
  
  constructor(private http:HttpClient) {}
  getData(): Observable<any> {
    const url = ("https://jasonwatmore.com/post/2020/10/03/angular-10-simple-pagination-example")
    return this.http.get<any>(url)
  }
}
