export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  icon: string;
  category: string;
  available: boolean;
  inventory: number;
  rating: number;
  reviews: number;
  unit: string;
}

export interface ProductsResponse {
  products: Product[];
}

export type ProductCategory = 
  | 'all'
  | 'Wire Fencing'
  | 'Electric Fence'
  | 'Fence Posts'
  | 'Chain Link'
  | 'Wood Fencing'
  | 'Fence Tools'
  | 'Gate Hardware'
  | 'Livestock Panels';
