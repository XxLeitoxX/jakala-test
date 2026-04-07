import { Product } from "@/modules/products/core/product";
import { api } from "@/services/api";

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ProductsPage {
  items: Product[];
  page: number;
  limit: number;
  total: number;
  nextPage: number | null;
}

const parseProduct = (input: unknown): Product => {
  const candidate = input as Record<string, unknown>;
  const description =
    typeof candidate.description === "string" && candidate.description.trim().length > 0
      ? candidate.description
      : String(candidate.binomialName ?? "Sin descripcion disponible");

  return {
    id: String(candidate.id ?? ""),
    name: String(candidate.name ?? ""),
    price: Number(candidate.price ?? 0),
    image: String(candidate.image ?? candidate.imgUrl ?? ""),
    description,
    isNew: typeof candidate.isNew === "boolean" ? candidate.isNew : false,
    binomialName: String(candidate.binomialName ?? ""),
    wateringsPerWeek:
      typeof candidate.wateringsPerWeek === "number" ? candidate.wateringsPerWeek : undefined,
    fertilizerType: String(candidate.fertilizerType ?? ""),
  };
};

async function apiRequest<T>(path: string): Promise<T> {
  try {
    const response = await api.get<T>(path);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message);
    }
    throw new ApiError("Error al consultar la API de productos");
  }
}

export async function getProducts(page = 1, limit = 6): Promise<ProductsPage> {
  const data = await apiRequest<unknown[]>("/product");
  const allProducts = data.map(parseProduct);
  const start = (page - 1) * limit;
  const items = allProducts.slice(start, start + limit);
  const nextPage = start + limit < allProducts.length ? page + 1 : null;

  return {
    items,
    page,
    limit,
    total: allProducts.length,
    nextPage,
  };
}

export async function getProductById(productId: string): Promise<Product> {
  const data = await apiRequest<unknown>(`/product/${productId}`);
  return parseProduct(data);
}

export { ApiError };

