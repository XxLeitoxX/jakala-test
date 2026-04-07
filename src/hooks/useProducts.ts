"use client";

import { useQuery } from "@tanstack/react-query";

import { Product } from "@/core/product";

export const PRODUCTS_QUERY_KEY = ["products"];

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error(`No se pudo obtener el listado de productos (HTTP ${response.status})`);
  }
  return (await response.json()) as Product[];
};

export const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: fetchProducts,
    // Cache conservador: evita refetches agresivos al navegar entre listado/detalle.
    staleTime: 60_000,
  });

