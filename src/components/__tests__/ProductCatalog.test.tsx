import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

import { ProductCatalog } from "@/components/ProductCatalog";
import { Product } from "@/core/product";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt} />,
}));

vi.mock("@/hooks/useProducts", () => ({
  useProducts: vi.fn(),
}));

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Ramo de Rosas",
    description: "Ramo clasico rojo",
    image: "https://dulces-petalos.jakala.es/images/rosas.jpg",
    price: 29.99,
  },
  {
    id: "2",
    name: "Tulipanes Blancos",
    description: "Perfectos para celebraciones",
    image: "https://dulces-petalos.jakala.es/images/tulipanes.jpg",
    price: 24.5,
  },
];

describe("ProductCatalog", () => {
  it("filtra productos al escribir en SearchBar", async () => {
    const { useProducts } = await import("@/hooks/useProducts");

    vi.mocked(useProducts).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useProducts>);

    render(<ProductCatalog />);

    expect(screen.getByText("Ramo de Rosas")).toBeInTheDocument();
    expect(screen.getByText("Tulipanes Blancos")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Buscar productos"), "tulipanes");

    expect(screen.queryByText("Ramo de Rosas")).not.toBeInTheDocument();
    expect(screen.getByText("Tulipanes Blancos")).toBeInTheDocument();
  });
});

