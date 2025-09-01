import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../core/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  errorMsg!: string;
  constructor(private _Dataservice:DataService, private router: Router){}
  addProduct=new FormGroup({
    name: new FormControl(null),
    image: new FormControl(null),
    price: new FormControl(null),
    description: new FormControl(null),
    stock: new FormControl(null),
  })

  sendData(){
    this._Dataservice.addProduct(this.addProduct.value).subscribe({
      next:(res)=>{
        console.log(res);

    this.router.navigate(["/products"])
      },

      error:(err)=>{

        if (err.status === 409) {
        this.errorMsg=err.error.Message
      }
      if (err.status === 403) {
        this.errorMsg=err.error.Message
      }
      }

    })
  }

  onCancel(): void {
  this.router.navigate(['/products']);
}

}
