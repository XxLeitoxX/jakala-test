interface ProductCatalogLoadMoreProps {
  isSearching: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  sentinelRef: (node?: Element | null) => void;
}

export const ProductCatalogLoadMore = ({
  isSearching,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  sentinelRef,
}: ProductCatalogLoadMoreProps) => {
  if (isSearching || !hasNextPage) {
    return null;
  }

  return (
    <>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
          className="rounded-full bg-[#7b1848] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#65123a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isFetchingNextPage ? "Cargando..." : "Ver más"}
        </button>
      </div>
      <div ref={sentinelRef} data-testid="catalog-sentinel" className="h-1 w-full" aria-hidden="true" />
    </>
  );
};

