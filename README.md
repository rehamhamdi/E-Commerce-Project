#  E-Commerce Project
This is a **E-Commerce Backend** built using Node.js, Express, and MongoDB.  

---

##  Features
###  Authentication & Authorization
- Register with email confirmation  
- Login with JWT
- Passwords are hashed for security
- Roles: **User** and **Admin**
###  Users
- Register, Login, Update, Delete  
- Email confirmation required  
- Admin can view all users  
###  Products
- CRUD operations by **Admin only**  
- List all products (public)  
###  Cart
- Each user has a personal cart  
- Add / Update / Remove items  
###  Orders
- User can place orders from their cart  
- Admin can manage all orders (**CRUD, status update**)
  
---

## Admin Setup
- Register normally as a user.
- In MongoDB, set this user’s role to admin and isConfirmed to true.
  
---

##  API Endpoints
 **Users**

- POST /user → Register

- POST /userLogin → Login

- GET /user/verify/:emailToken → Verify account

- GET /user (admin only) → Get all users

- PUT /user/:id → Update user (self or admin)

- DELETE /user/:id → Delete user (self or admin)

**Products**

- GET /product → Get all products

- POST /product (admin only) → Add product

- PUT /product/:id (admin only) → Update product

- DELETE /product/:id (admin only) → Delete product

 **Cart**

- POST /cart → Add product to cart

- GET /cart → Get user cart

- PUT /cart/:id → Update cart item

- DELETE /cart/:id → Remove cart item

 **Orders** 

- POST /order → Create order from cart

- GET /order → Get my orders

- GET /orders (admin only) → Get all orders

- PUT /order/:id (admin only) → Update order status

- DELETE /order/:id (admin only) → Delete order
