import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ManageOrdersComponent } from './components/admin/manage-orders/manage-orders.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { UpdateProductComponent } from './components/admin/update-product/update-product.component';

export const routes: Routes = [
  {path: "home", component:HomeComponent,title:"Home"},
  {path:"products",component:ProductsComponent,title:"Products"},
  {path:"products/addProduct",component:AddProductComponent,title:"Add Product"},
  {path:"products/updateProduct/:id",component:UpdateProductComponent,title:"Update Product"},
  {path:"orders",component:OrdersComponent,title:"Orders"},
  {path:"cart",component:CartComponent,title:"Cart"},
  {path:"signup",component:SignupComponent,title:"Sign UP"},
  {path:"login",component:LoginComponent,title:"Login"},
  {path:"manageOrders",component: ManageOrdersComponent,title:"Orders"},
  {path:"", redirectTo:'home',pathMatch:"full",title:"Home"},
  {path:"**",component:NotFoundComponent ,title:"Not Found"}
];
