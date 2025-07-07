import type { Product, ProductsResponse } from "../types/product";

const API_DELAY = 1000;

export const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  try {
    const response = await fetch("/products.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data.products;
  } catch (error) {
    throw new Error(
      "Failed to fetch products: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};
