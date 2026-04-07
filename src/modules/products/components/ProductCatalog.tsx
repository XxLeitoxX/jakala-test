"use client";

import { ProductCatalogError } from "@/modules/products/components/ProductCatalogError";
import { ProductCatalogEmpty } from "@/modules/products/components/ProductCatalogEmpty";
import { ProductCatalogLoading } from "@/modules/products/components/ProductCatalogLoading";
import { ProductCatalogLoadMore } from "@/modules/products/components/ProductCatalogLoadMore";
import { ProductGrid } from "@/modules/products/components/ProductGrid";
import { SearchBar } from "@/modules/products/components/SearchBar";
import { useProductCatalog } from "@/modules/products/hooks/useProductCatalog";

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

