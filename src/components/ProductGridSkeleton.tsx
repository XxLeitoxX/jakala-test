interface ProductGridSkeletonProps {
  items?: number;
}

export const ProductGridSkeleton = ({ items = 6 }: ProductGridSkeletonProps) => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Cargando productos"
    className="grid grid-cols-1 gap-6 md:grid-cols-3"
  >
    {Array.from({ length: items }).map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white"
      >
        <div className="h-48 w-full bg-slate-200" />
        <div className="space-y-3 p-4">
          <div className="h-5 w-2/3 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-5/6 rounded bg-slate-200" />
          <div className="h-6 w-1/3 rounded bg-slate-200" />
        </div>
      </div>
    ))}
  </div>
);

