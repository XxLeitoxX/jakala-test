interface ProductCatalogErrorProps {
  message?: string;
}

export const ProductCatalogError = ({ message }: ProductCatalogErrorProps) => (
  <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
    {message || "No se pudieron cargar los productos."}
  </p>
);

