import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _HttpClient:HttpClient) { }

  getDate(): Observable<any>{
      return this._HttpClient.get("http://localhost:3000/product")
  }
   addProduct(data:any):Observable<any>{
    const token = localStorage.getItem("token");
   const headers = new HttpHeaders({
   token: `${token}`
});
    return this._HttpClient.post("http://localhost:3000/product",data, { headers })
}

getProduct(productId: string): Observable<any> {
  const token = localStorage.getItem("token");
  const headers = new HttpHeaders({
   token: `${token}`
});
  return this._HttpClient.get(
    `http://localhost:3000/product/${productId}`,
    { headers }
  );
}

deleteProduct(productId: string){
  const token = localStorage.getItem("token");
   const headers = new HttpHeaders({
   token: `${token}`
});
    return this._HttpClient.delete(`http://localhost:3000/product/${productId}`, { headers })

  }
  updateProduct(productId: string, updatedData: any){
  const token = localStorage.getItem("token");
   const headers = new HttpHeaders({
   token: `${token}`
});
    return this._HttpClient.put<{product: product}>(`http://localhost:3000/product/${productId}`,updatedData, { headers })
}
}


