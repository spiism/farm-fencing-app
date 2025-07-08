import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchProducts } from "./api.ts";

describe("fetchProducts", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and returns products successfully", async () => {
    const mockProducts = [
      { id: "1", name: "Product 1", price: 10, currency: "USD" },
      { id: "2", name: "Product 2", price: 20, currency: "USD" },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ products: mockProducts }),
        } as Response)
      )
    );

    const products = await fetchProducts();
    expect(products).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledWith("/products.json");
  });

  it("throws error when fetch response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        } as Response)
      )
    );

    await expect(fetchProducts()).rejects.toThrow("HTTP error! status: 500");
  });

  it("throws error when fetch itself rejects", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network failure")))
    );

    await expect(fetchProducts()).rejects.toThrow(
      "Failed to fetch products: Network failure"
    );
  });
});