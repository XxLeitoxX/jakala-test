"use client";

import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";
import { SearchBar } from "@/components/SearchBar";
import { useProductFilter } from "@/hooks/useProductFilter";
import { useProducts } from "@/hooks/useProducts";

export const ProductCatalog = () => {
  const { data = [], isLoading, isError, error } = useProducts();
  const { searchTerm, setSearchTerm, filteredProducts } = useProductFilter(data);

  if (isLoading) {
    return <ProductGridSkeleton />;
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
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

