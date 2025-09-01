import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    const token = localStorage.getItem("token");
       const headers = new HttpHeaders({
       token: `${token}`
    });
    return this.http.get(`http://localhost:3000/cart`,{headers});
  }

addToCart(productId: string, quantity: number = 1): Observable<any> {
  const token = localStorage.getItem("token");
if (!token) {
    return throwError(() => new Error('No token found'));
  }
    const decoded: any = jwtDecode(token);
    const userId = decoded.id;

    const headers = new HttpHeaders({
      'token': token,
      'Content-Type': 'application/json'
    });

    return this.http.post('http://localhost:3000/cart',
      { userId, productId, quantity },
      { headers }
    );

}

  removeFromCart(cartItemId: string): Observable<any> {
  const token = localStorage.getItem("token");
  const headers = new HttpHeaders({
    token: `${token}`
  });

  return this.http.delete(`http://localhost:3000/cart/${cartItemId}`, { headers });
}

updateCartItem(cartItemId: string, quantity: number): Observable<any> {
  const token = localStorage.getItem("token");
  const headers = new HttpHeaders({
    token: `${token}`
  });
  return this.http.put(`http://localhost:3000/cart/${cartItemId}`,
    { quantity },
    { headers }
  );
}
}
