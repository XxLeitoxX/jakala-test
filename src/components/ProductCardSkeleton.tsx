export const ProductCardSkeleton = () => (
  <div className="w-full max-w-[384px] animate-pulse rounded-3xl border border-slate-200 bg-white p-3">
    <div className="space-y-2 px-1">
      <div className="h-8 w-2/3 rounded bg-slate-200" />
      <div className="h-5 w-1/2 rounded bg-slate-200" />
    </div>
    <div className="mt-4 h-[300px] w-full rounded-2xl bg-slate-200" />
  </div>
);

