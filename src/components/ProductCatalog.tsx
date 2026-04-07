"use client";

import { ProductCatalogError } from "@/components/ProductCatalogError";
import { ProductCatalogEmpty } from "@/components/ProductCatalogEmpty";
import { ProductCatalogLoading } from "@/components/ProductCatalogLoading";
import { ProductCatalogLoadMore } from "@/components/ProductCatalogLoadMore";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchBar } from "@/components/SearchBar";
import { useProductCatalog } from "@/hooks/useProductCatalog";

export const ProductCatalog = () => {
  const { products, searchTerm, setSearchTerm, isLoading, isError, error, isSearching, hasNextPage, isFetchingNextPage, fetchNextPage, animatedIds, sentinelRef } = useProductCatalog();

  if (isLoading) return <ProductCatalogLoading />;
  if (isError) return <ProductCatalogError message={error?.message} />;

  return (
    <section>
      <div className="py-12">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      {products.length === 0 ? <ProductCatalogEmpty /> : (
        <>
          <ProductGrid products={products} animatedIds={animatedIds} isFetchingNextPage={isFetchingNextPage} isSearching={isSearching} />
          <ProductCatalogLoadMore
            isSearching={isSearching}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
            sentinelRef={sentinelRef}
          />
        </>
      )}
    </section>
  );
};

