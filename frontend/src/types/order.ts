export type Product = {
  id: number;
  productName: string;
  productDescription?: string | null;
};

export type OrderProduct = {
  id: number;
  orderId: number;
  productId: number;
  product?: Product;
};

export type Order = {
  id: number;
  orderDescription: string;
  createdAt: string;
  orderProducts?: OrderProduct[];
};
