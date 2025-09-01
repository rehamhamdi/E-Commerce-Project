import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  signUp(data:any):Observable<any>{
      return this._HttpClient.post("http://localhost:3000/user",data)
  }

  login(data:any):Observable<any> {
  return  this._HttpClient.post('http://localhost:3000/userLogin', data)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
      const token = localStorage.getItem('token');
      if (!token) return false;
      const decoded: any = jwtDecode(token);
      return decoded.role === 'admin';
  }

   logout(): void {
    localStorage.removeItem('token');
  }
}
