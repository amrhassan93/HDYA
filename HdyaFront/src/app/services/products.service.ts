import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/interfaces/product'
import { ProductPicture } from '../models/interfaces/product-picture'
import { Category } from '../models/interfaces/category'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }



  viewProducts():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/products/`)
  }


  viewProductsByPage(url:string):Observable<any>{
    return this.http.get<any>(url)
  }

 
  viewProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}/`)
  }

  myProducts():Observable<any[]>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any[]>(`${environment.apiUrl}/my/products/`, requestOptions)

  }


  order(product:number , quantity:number , status:string = 'p'  ):Observable<any>{

    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post<any>(`${environment.apiUrl}/orders/`, {product : product, quantity:quantity ,status :status} , requestOptions)
  }


  showorders():Observable<any>{

    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.get<any>(`${environment.apiUrl}/my/orders/`, requestOptions)
  }


  showIncomingOrders():Observable<any>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.get<any>(`${environment.apiUrl}/orders/`, requestOptions)
  }




  deleteOrder(order_id:number):Observable<any>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.delete<any>(`${environment.apiUrl}/orders/${order_id}/`, requestOptions)
  }

  searchProducts(searchparams:object):Observable<Product>{ 
    let query_string= "" ; 
      for (let i in searchparams){
        query_string+=`${i}=${searchparams[i]}&`
      }
      
    console.log(`${environment.apiUrl}/products/?${query_string}`);
    return this.http.get<Product>(`${environment.apiUrl}/product/search/?${query_string}`)
  }

  createProduct(data:object):Observable<Product>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post<Product>(`${environment.apiUrl}/products/` , data , requestOptions) 
  }

  editProduct( pdr_id:number , data:object):Observable<any>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.patch<Product>(`${environment.apiUrl}/products/${pdr_id}/` , {name : data.name ,details:data.details , age_from : data.age_from , age_to : data.age_to , price :data.price , occassions : data.occassions , gender : data.gender , relationships : data.relationships , category : data.category}, requestOptions) 
  }
  deletimg(img_id:number):Observable<ProductPicture>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.delete<ProductPicture>(`${environment.apiUrl}/product_imgs/${img_id}/` , requestOptions)
  }

  createProductImages(data:any):Observable<ProductPicture>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.post<ProductPicture>(`${environment.apiUrl}/product_imgs/` , data , requestOptions)
  }


  showcategories():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/categories/`)
  }


  showrelations():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/RelationShips/`)
  }

  showoccassions():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/occassions/`)
  }

  ReviewProduct(body:string , rate:number ,product:number):Observable<any>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post<Product>(`${environment.apiUrl}/product/reviews/` ,{body:body,rate:rate,product:product} , requestOptions) 
    
  }

  showreviews(product_id:number):Observable<any>{
    
    return this.http.get<Product>(`${environment.apiUrl}/product/reviews/?product=${product_id}`, ) 
    
  }

  Report(body:string,product:number):Observable<any>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post<Product>(`${environment.apiUrl}/productreports/` ,{body:body,product:product} , requestOptions) 
    
  }


  reviewReport(body:string,product:number):Observable<any>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post<Product>(`${environment.apiUrl}/reviewreport/` ,{body:body,product:product} , requestOptions) 
    
  }



}
