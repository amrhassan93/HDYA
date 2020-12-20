import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/interfaces/product'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }



  viewProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`http://127.0.0.1:8000/products/`)
  }

  viewProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`http://127.0.0.1:8000/products/${id}/`)
  }
}
