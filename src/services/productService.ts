import { Product } from "@/core/product";
import { Agent } from "undici";

const API_BASE_URL = "https://dulces-petalos.jakala.es";
const insecureAgent = new Agent({
  connect: { rejectUnauthorized: false },
});

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
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
    // La API de prueba expone un certificado expirado; en entorno servidor
    // permitimos la conexion para que la app siga funcionando durante la prueba tecnica.
    ...(typeof window === "undefined" ? ({ dispatcher: insecureAgent } as object) : {}),
  });

  if (!response.ok) {
    throw new ApiError("Error al consultar la API de productos", response.status);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError("La API devolvio un JSON invalido", response.status);
  }
}

export async function getProducts(page = 1, limit = 6): Promise<ProductsPage> {
  const data = await apiRequest<unknown[]>("/api/v1/product");
  const allProducts = data.map(parseProduct);
  const start = (page - 1) * limit;
  const items = allProducts.slice(start, start + limit);
  const nextPage = start + limit < allProducts.length ? page + 1 : null;

  // La API de prueba no expone paginacion nativa; simulamos por pagina con slice().
  return {
    items,
    page,
    limit,
    total: allProducts.length,
    nextPage,
  };
}

export async function getProductById(productId: string): Promise<Product> {
  const data = await apiRequest<unknown>(`/api/v1/product/${productId}`);
  return parseProduct(data);
}

export { ApiError };

