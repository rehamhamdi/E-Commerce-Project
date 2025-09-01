import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private _AuthService:AuthService ,private router:Router){}
  login=new FormGroup({
    email: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required,Validators.minLength(5)])
  })
  errorMsg!:string

sendData(){
    if(this.login.valid){
      this._AuthService.login(this.login.value).subscribe({
      next:(res)=>{
        localStorage.setItem("token", res.token)
              this.router.navigate(['products']);


      },
      error:(err)=>{
        if (err.status === 401) {
        this.errorMsg=err.error.Message
      }
      if (err.status === 403) {
        this.errorMsg=err.error.Message
      }
      }
    })
    }
  }
}
