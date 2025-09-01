import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor(private http: HttpClient) {}

  getUserOrders(): Observable<any> {
    const token = localStorage.getItem("token");
       const headers = new HttpHeaders({
       token: `${token}`
    });
    return this.http.get(`http://localhost:3000/order`,{headers});
  }

  checkout(): Observable<any> {
    const token = localStorage.getItem("token");
   const headers = new HttpHeaders({
   token: `${token}`
});
    return this.http.post(`http://localhost:3000/order`,{}, {headers});
  }


  getAllOrders(): Observable<any> {
    const token = localStorage.getItem("token");
   const headers = new HttpHeaders({
   token: `${token}`
});
    return this.http.get(`http://localhost:3000/orders`,{headers});
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    const token = localStorage.getItem("token");
   const headers = new HttpHeaders({
   token: `${token}`
});
    return this.http.put(`http://localhost:3000/order/${orderId}`, { status },{headers});
  }

  deleteOrder(orderId: string): Observable<any> {
    const token = localStorage.getItem("token");
   const headers = new HttpHeaders({
   token: `${token}`
});
    return this.http.delete(`http://localhost:3000/order/${orderId}`,{headers});
  }
}

