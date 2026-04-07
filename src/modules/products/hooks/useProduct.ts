"use client";

import { useQuery } from "@tanstack/react-query";

import { Product } from "@/modules/products/core/product";

const fetchProduct = async (productId: string): Promise<Product> => {
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok) {
    throw new Error(`No se pudo obtener el detalle del producto (HTTP ${response.status})`);
  }
  return (await response.json()) as Product;
};

export const useProduct = (productId: string) =>
  useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    enabled: Boolean(productId),
    staleTime: 60_000,
  });

