export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'men' | 'women' | 'accessories';
  images: string[];
  features?: string[];
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}
