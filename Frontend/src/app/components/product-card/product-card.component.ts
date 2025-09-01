import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { product } from '../../core/interfaces/product';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  constructor(private _AuthService:AuthService,private _Dataservice:DataService, private router: Router,private _cartService:CartService){}
      @Input() Mydata!:product
      @Output() productDeleted = new EventEmitter<string>();
      @Output() productUpdated = new EventEmitter<product>();

  isAdmin(): boolean {
  return this._AuthService.isAdmin();
}

deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this._Dataservice.deleteProduct(productId).subscribe({
        next: () => {
          this.productDeleted.emit(productId);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
}

 addToCart(productId: string) {
    console.log("Adding product:", productId);
    this._cartService.addToCart(productId, 1).subscribe({
      next: (res) => {
        console.log("CART RES:", res);
      },
      error: (err) => {
        this.router.navigate(["/login"])
      }
    });
  }

}
