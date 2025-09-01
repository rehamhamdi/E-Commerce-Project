export interface Order {
  _id: string;
  userId?: {
    _id: string;
    name: string;
    email: string;
  };
  cartItems: {
    productId?: {
      _id: string;
      name: string;
      price: number;

    };
    quantity: number;
  }[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  address: string;
  createdAt: string;
  updatedAt: string;
}

