import { ProductCard } from "@/modules/products/components/ProductCard";
import { ProductCardSkeleton } from "@/modules/products/components/ProductCardSkeleton";
import { Product } from "@/modules/products/core/product";

interface ProductGridProps {
  products: Product[];
  animatedIds: Set<string>;
  isFetchingNextPage: boolean;
  isSearching: boolean;
}

export const ProductGrid = ({
  products,
  animatedIds,
  isFetchingNextPage,
  isSearching,
}: ProductGridProps) => (
  <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
    {products.map((product, index) => (
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
);

