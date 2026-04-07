"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { useProductFilter } from "@/hooks/useProductFilter";
import { useProducts } from "@/hooks/useProducts";

export const useProductCatalog = () => {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts();
  const { ref, inView } = useInView({ rootMargin: "120px" });
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const [animatedIds, setAnimatedIds] = useState<Set<string>>(new Set());
  const previousCountRef = useRef(0);

  const loadedProducts = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data?.pages],
  );
  const { searchTerm, setSearchTerm, filteredProducts } = useProductFilter(loadedProducts);
  const isSearching = searchTerm.trim().length > 0;

  useEffect(() => {
    const previousCount = previousCountRef.current;
    const currentCount = loadedProducts.length;

    if (currentCount > previousCount) {
      const newIds = loadedProducts.slice(previousCount).map((product) => product.id);
      setAnimatedIds(new Set(newIds));

      const timeoutId = window.setTimeout(() => setAnimatedIds(new Set()), 500);
      previousCountRef.current = currentCount;
      return () => window.clearTimeout(timeoutId);
    }

    previousCountRef.current = currentCount;
  }, [loadedProducts]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) {
        setHasUserScrolled(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (hasUserScrolled && inView && hasNextPage && !isFetchingNextPage && !isSearching) {
      fetchNextPage();
    }
  }, [
    fetchNextPage,
    hasNextPage,
    hasUserScrolled,
    inView,
    isFetchingNextPage,
    isSearching,
  ]);

  return {
    products: filteredProducts,
    searchTerm,
    setSearchTerm,
    isLoading,
    isError,
    error,
    isSearching,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    fetchNextPage,
    animatedIds,
    sentinelRef: ref,
  };
};

