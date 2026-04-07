"use client";

import { useMemo, useState } from "react";

import { Product } from "@/core/product";

export const useProductFilter = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return products;
    }

    return products.filter((product) =>
      `${product.name} ${product.description}`.toLowerCase().includes(normalized),
    );
  }, [products, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts,
  };
};

