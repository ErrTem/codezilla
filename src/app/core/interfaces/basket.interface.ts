import { CartItem } from '@core/interfaces/product.interface';

export interface ShoppingBasket {
  basketTotalPrice: number;
  basketTotalQuantity: number;
  customerId: number | null;
  products: CartItem[];
}
