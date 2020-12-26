import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/interfaces/product'
import { Category } from '../models/interfaces/category'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }



  viewProducts():Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/products/`)
  }

 
  viewProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`http://127.0.0.1:8000/products/${id}/`)
  }

  // viewProductsBycat(catId?:number):Observable<Product>{ 
  //   return this.http.get<Product>(`http://127.0.0.1:8000/products/?category=${catId}`)
  // }
  // viewProductsBycat(name:string,price?:number,gender?:string,age_from?:number,age_to?:number,catId?:number,user?:number,is_featured?:boolean):Observable<Product>{ 
  //   return this.http.get<Product>(`http://127.0.0.1:8000/products/?name=${name}&price=${price}&gender=${gender}&age_from=${age_from}&age_to=${age_to}&category=${catId}&user=${user}&is_featured=${is_featured}/`)
  // }

  createProduct(data:object):Observable<Product>{
    return this.http.post<Product>(`http://127.0.0.1:8000/products/` , data)
  }

  showcategories():Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/categories/`)
  }


}
