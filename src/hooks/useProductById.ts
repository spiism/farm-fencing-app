import { useParams } from "react-router-dom";
import { useProducts } from "./useProducts";

export const useProductById = () => {
  const { id } = useParams();
  const { products, loading, error, refetch } = useProducts();
  const product = products.find((p) => p.id === id);

  return {
    product,
    loading,
    error,
    refetch,
  };
};
