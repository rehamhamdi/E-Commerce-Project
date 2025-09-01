import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: any = { items: [] };
  totalPrice = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private ordersService: OrderService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (data: any) => {
        if (data.items) {
          this.cart = data;
        } else if (data.cart) {
          this.cart = { items: data.cart.map((item: any) => ({
            _id: item._id,
            product: item.productId,
            quantity: item.quantity
          })) };
        }
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        if (err.error?.Message === "Your cart is empty") {
          this.cart = { items: [] };
        }
      }
    });
  }

  calculateTotal() {
    this.totalPrice = this.cart.items.reduce((acc: number, item: any) => {
      if (item.product && typeof item.product.price === 'number') {
        return acc + (item.product.price * item.quantity);
      }
      return acc;
    }, 0);
  }

  removeItem(cartItemId: string) {
    this.cartService.removeFromCart(cartItemId).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        console.error('Error removing item:', err);
        this.errorMessage = err.error?.Message || 'Failed to remove item';
      }
    });
  }

  updateQuantity(cartItemId: string, quantity: number) {
    if (quantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }

    this.cartService.updateCartItem(cartItemId, quantity).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        console.error('Error updating quantity:', err);
        this.errorMessage = err.error?.Message || 'Failed to update quantity';
        this.loadCart(); 
      }
    });
  }

  checkout(): void {
    this.ordersService.checkout().subscribe({
      next: () => {
        this.successMessage = 'Order placed successfully!';
        this.errorMessage = '';
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        if (err.status === 400 && err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Checkout failed. Please try again.';
        }
        this.successMessage = '';
      }
    });
  }
}
