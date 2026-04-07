import { NextResponse } from "next/server";

import { ApiError, getProducts } from "@/services/productService";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status ?? 500 });
    }

    return NextResponse.json({ message: "Error inesperado al cargar productos" }, { status: 500 });
  }
}

