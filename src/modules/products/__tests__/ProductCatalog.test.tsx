import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

import { ProductCatalog } from "@/modules/products/components/ProductCatalog";
import { Product } from "@/modules/products/core/product";
import { useProductCatalog } from "@/modules/products/hooks/useProductCatalog";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt} />,
}));

vi.mock("@/modules/products/hooks/useProductCatalog", () => ({
  useProductCatalog: vi.fn(),
}));

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Ramo de Rosas",
    description: "Ramo clasico rojo",
    image: "https://dulces-petalos.jakala.es/images/rosas.jpg",
    price: 29.99,
    isNew: false,
  },
  {
    id: "2",
    name: "Tulipanes Blancos",
    description: "Perfectos para celebraciones",
    image: "https://dulces-petalos.jakala.es/images/tulipanes.jpg",
    price: 24.5,
    isNew: false,
  },
];

describe("ProductCatalog", () => {
  it("muestra skeletons en carga inicial", async () => {
    vi.clearAllMocks();

    vi.mocked(useProductCatalog).mockReturnValue({
      products: [],
      searchTerm: "",
      setSearchTerm: vi.fn(),
      isLoading: true,
      isError: false,
      error: null,
      isSearching: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
      animatedIds: new Set(),
      sentinelRef: vi.fn(),
    });

    render(<ProductCatalog />);

    expect(screen.getByLabelText("Cargando productos")).toBeInTheDocument();
  });

  it("filtra productos al escribir en SearchBar", async () => {
    const setSearchTerm = vi.fn();

    vi.mocked(useProductCatalog).mockReturnValue({
      products: mockProducts,
      searchTerm: "",
      setSearchTerm,
      isLoading: false,
      isError: false,
      error: null,
      isSearching: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
      animatedIds: new Set(),
      sentinelRef: vi.fn(),
    });

    render(<ProductCatalog />);

    expect(screen.getByText("Ramo de Rosas")).toBeInTheDocument();
    expect(screen.getByText("Tulipanes Blancos")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Buscar en nuestra tienda"), "tulipanes");
    expect(setSearchTerm).toHaveBeenCalled();
  });

  it("muestra mensaje personalizado cuando hay error de API", async () => {
    vi.mocked(useProductCatalog).mockReturnValue({
      products: [],
      searchTerm: "",
      setSearchTerm: vi.fn(),
      isLoading: false,
      isError: true,
      error: new Error("No se pudo obtener el listado de productos"),
      isSearching: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
      animatedIds: new Set(),
      sentinelRef: vi.fn(),
    });

    render(<ProductCatalog />);

    expect(screen.getByText("No se pudo obtener el listado de productos")).toBeInTheDocument();
  });

  it("llama fetchNextPage cuando el centinela entra en viewport", async () => {
    const fetchNextPage = vi.fn();
    vi.mocked(useProductCatalog).mockReturnValue({
      products: mockProducts,
      searchTerm: "",
      setSearchTerm: vi.fn(),
      isLoading: false,
      isError: false,
      error: null,
      isSearching: false,
      hasNextPage: true,
      isFetchingNextPage: false,
      fetchNextPage,
      animatedIds: new Set(),
      sentinelRef: vi.fn(),
    });

    render(<ProductCatalog />);
    fireEvent.click(screen.getByRole("button", { name: "Ver más" }));

    await waitFor(() => expect(fetchNextPage).toHaveBeenCalled());
  });
});

