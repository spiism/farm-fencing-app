import type { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface AddToCartPayload {
  product: Product;
  quantity: number;
}

export interface UpdateQuantityPayload {
  id: string;
  quantity: number;
}
