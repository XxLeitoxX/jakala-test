"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { ProductsPage } from "@/modules/products/services/productService";

export const PRODUCTS_QUERY_KEY = ["products"];
const PRODUCTS_PAGE_LIMIT = 6;

const fetchProducts = async (pageParam: number): Promise<ProductsPage> => {
  const response = await fetch(`/api/products?page=${pageParam}&limit=${PRODUCTS_PAGE_LIMIT}`);
  if (!response.ok) {
    throw new Error(`No se pudo obtener el listado de productos (HTTP ${response.status})`);
  }
  return (await response.json()) as ProductsPage;
};

export const useProducts = () =>
  useInfiniteQuery<ProductsPage, Error>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: ({ pageParam }) => fetchProducts(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    staleTime: 60_000,
  });

