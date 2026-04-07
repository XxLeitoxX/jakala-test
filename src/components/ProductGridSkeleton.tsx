import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";

interface ProductGridSkeletonProps {
  items?: number;
}

export const ProductGridSkeleton = ({ items = 6 }: ProductGridSkeletonProps) => (
  <div role="status" aria-live="polite" aria-label="Cargando productos" className="mx-auto grid w-full max-w-[1120px] grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
    {Array.from({ length: items }).map((_, index) => (
      <ProductCardSkeleton key={`skeleton-${index}`} />
    ))}
  </div>
);

