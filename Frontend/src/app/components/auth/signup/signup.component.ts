import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private _AuthService:AuthService,private router:Router){}
  register=new FormGroup({
    name :new FormControl(null,[Validators.required, Validators.minLength(3)]),
    age:new FormControl(null,[Validators.required,Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.minLength(5)])
  })
  errorMsg!:string
  sendData(){
    if(this.register.valid){
      console.log(this.register.value)
      this._AuthService.signUp(this.register.value).subscribe({
        next: (res)=>{
          console.log(res)
          this.router.navigate(['login'])
        },
        error: (err)=>{
           if (err.status === 409) {
        this.errorMsg=err.error.Message
      }

        }
      })
    }
  }

}
