import { NextRequest, NextResponse } from "next/server";

import { ApiError, getProducts } from "@/modules/products/services/productService";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? "6");

  try {
    const products = await getProducts(page, limit);
    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status ?? 500 });
    }

    return NextResponse.json({ message: "Error inesperado al cargar productos" }, { status: 500 });
  }
}

