import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { product } from '../../core/interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit  {
  constructor(private _DataService:DataService ,private _AuthService:AuthService){}
      products: product[] = [];
     selectedProduct: product | null = null;

    isAdmin(): boolean {
      return this._AuthService.isAdmin();
}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this._DataService.getDate().subscribe({
      next: (res) => this.products = res.products,
      error: (err) => console.log(err)
    });
  }

  onProductDeleted(): void {
    this.loadProducts();
  }
  onProductUpdate(product: product) {
    this.selectedProduct = product;
  }
}
