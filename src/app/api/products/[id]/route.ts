import { NextResponse } from "next/server";

import { ApiError, getProductById } from "@/services/productService";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteProps) {
  const { id } = await params;

  try {
    const product = await getProductById(id);
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status ?? 500 });
    }

    return NextResponse.json({ message: "Error inesperado al cargar el producto" }, { status: 500 });
  }
}

