import { Component } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { NgClass } from '@angular/common';
import { Order } from '../../core/interfaces/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
 myOrders: Order[] = [];

  constructor(private ordersService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getUserOrders().subscribe({
      next: (data) => this.myOrders = data.orders || [],
      error: (err) => console.error('Error fetching orders:', err)
    });
  }
}
