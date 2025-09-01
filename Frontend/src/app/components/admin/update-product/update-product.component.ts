import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../core/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
   updateForm: FormGroup;
  productId: string;
  errorMsg: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _DataService: DataService
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]]
    });

    this.productId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadProductData();
  }

  loadProductData(): void {
    this.isLoading = true;
    this._DataService.getProduct(this.productId).subscribe({
      next: (response: any) => {
        this.updateForm.patchValue({
          name: response.product.name,
          image: response.product.image,
          price: response.product.price,
          description: response.product.description,
          stock: response.product.stock
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load product data';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.isLoading = true;
      this.errorMsg = '';

      this._DataService.updateProduct(this.productId, this.updateForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMsg = error.error?.Message || 'Failed to update product';
        }
      });
    } else {
      this.errorMsg = 'Please fill all required fields correctly';
    }
  }
  onCancel(): void {
  this.router.navigate(['/products']);
}
}
