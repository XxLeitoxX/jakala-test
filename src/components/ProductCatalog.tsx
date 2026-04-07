"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";
import { SearchBar } from "@/components/SearchBar";
import { useProductFilter } from "@/hooks/useProductFilter";
import { useProducts } from "@/hooks/useProducts";

export const ProductCatalog = () => {
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
  }, [fetchNextPage, hasNextPage, hasUserScrolled, inView, isFetchingNextPage, isSearching]);

  if (isLoading) {
    return <ProductGridSkeleton items={6} />;
  }

  if (isError) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        {error.message || "No se pudieron cargar los productos."}
      </p>
    );
  }

  return (
    <section>
      <div className="py-12">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600">
          No hay productos que coincidan con tu busqueda.
        </p>
      ) : (
        <>
          <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 6}
                className={animatedIds.has(product.id) ? "fade-in-item" : ""}
              />
            ))}
            {isFetchingNextPage &&
              !isSearching &&
              Array.from({ length: 3 }).map((_, index) => (
                <ProductCardSkeleton key={`next-page-skeleton-${index}`} />
              ))}
          </div>

          {/* Decidimos filtrar sobre las paginas ya cargadas para no resetear la experiencia de scroll. */}
          {!isSearching && hasNextPage ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="rounded-full bg-[#7b1848] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#65123a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isFetchingNextPage ? "Cargando..." : "Ver más"}
              </button>
            </div>
          ) : null}

          {!isSearching && hasNextPage ? <div ref={ref} className="h-1 w-full" aria-hidden="true" /> : null}
        </>
      )}
    </section>
  );
};

