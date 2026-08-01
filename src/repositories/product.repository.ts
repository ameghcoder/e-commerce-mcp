import type { Product } from "../domain/types.js";
import { products } from "../data/products.js";

export class ProductRepository {
  findBySku(sku: string): Product | null {
    return products.find((product) => product.sku === sku) ?? null;
  }

  findMany(): Product[] {
    return products;
  }
}
