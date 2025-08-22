#  E-Commerce Project
This is a **E-Commerce Backend ** built using Node.js, Express, and MongoDB.  

---

##  Features
- User registration and login with JWT authentication
- Role-based access (Admin / User)
- Email confirmation for accounts
- Product management
- Cart management
- Order creation
- MongoDB with Mongoose 

---

##  API Endpoints
 Auth

- POST /user → Register

- POST /userLogin → Login

- GET /user/verify/:emailToken → Verify account

 Users

- GET /user (admin only) → Get all users

- PUT /user/:id → Update user (self or admin)

- DELETE /user/:id → Delete user (self or admin)

Products

- GET /product → Get all products

- POST /product (admin only) → Add product

- PUT /product/:id (admin only) → Update product

- DELETE /product/:id (admin only) → Delete product

Cart

- POST /cart → Add product to cart

- GET /cart → Get user cart

- PUT /cart/:id → Update cart item

- DELETE /cart/:id → Remove cart item

Orders

- POST /order → Create order from cart

- GET /order → Get my orders

- GET /orders (admin only) → Get all orders

- PUT /order/:id (admin only) → Update order status

- DELETE /order/:id (admin only) → Delete order

 # Admin Setup

- Register normally as a user.
- In MongoDB, set this user’s role to admin and isConfirmed to true:

