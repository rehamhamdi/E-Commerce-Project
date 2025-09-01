import { Component } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/interfaces/order';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [NgClass],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent {
 orders: Order[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.errorMessage = '';
    this._orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.orders || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.errorMessage = 'Failed to load orders. Please try again.';
        this.loading = false;
      }
    });
  }

  updateOrderStatus(orderId: string, newStatus: string): void {
    this._orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: (response) => {
        this.successMessage = response.Message || 'Order status updated successfully!';
        this.loadOrders();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error('Error updating order:', err);
        this.errorMessage = err.error?.Message || 'Failed to update order status. Please try again.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  deleteOrder(orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this._orderService.deleteOrder(orderId).subscribe({
        next: (response) => {
          this.successMessage = response.Message || 'Order deleted successfully!';
          this.loadOrders();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          this.errorMessage = err.error?.Message || 'Failed to delete order. Please try again.';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }
}
