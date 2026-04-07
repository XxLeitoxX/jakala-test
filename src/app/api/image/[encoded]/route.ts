import { NextResponse } from "next/server";
import { Agent } from "undici";

const insecureAgent = new Agent({
  connect: { rejectUnauthorized: false },
});

const ALLOWED_HOST = "dulces-petalos.jakala.es";

interface RouteProps {
  params: Promise<{ encoded: string }>;
}

export async function GET(_: Request, { params }: RouteProps) {
  const { encoded } = await params;

  let src = "";
  try {
    src = decodeURIComponent(encoded);
  } catch {
    return new NextResponse("URL codificada invalida", { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(src);
  } catch {
    return new NextResponse("URL invalida", { status: 400 });
  }

  if (parsedUrl.hostname !== ALLOWED_HOST) {
    return new NextResponse("Host no permitido", { status: 403 });
  }

  const upstream = await fetch(parsedUrl.toString(), {
    ...({ dispatcher: insecureAgent } as object),
    next: { revalidate: 60 },
  });

  if (!upstream.ok) {
    return new NextResponse("No se pudo cargar la imagen", { status: upstream.status });
  }

  const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
  const arrayBuffer = await upstream.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  });
}

