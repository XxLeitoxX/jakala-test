import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApiError, getProductById } from "@/modules/products/services/productService";
import { formatCurrency } from "@/utils/formatCurrency";
import { getImageProxyUrl } from "@/utils/getImageProxyUrl";
import { PRODUCT_BLUR_DATA_URL } from "@/utils/imagePlaceholder";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  let product;

  try {
    product = await getProductById(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    return (
      <main className="content-wrap">
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          No se pudo cargar el detalle del producto.
        </p>
      </main>
    );
  }

  return (
    <main className="content-wrap">
      <div className="mb-6 flex items-center gap-2 text-xs text-[#72727d]">
        <Link href="/" className="hover:text-[#3a3a44]">
          Inicio
        </Link>
        <span>›</span>
        <span>{product.name}</span>
      </div>
      <article className="grid grid-cols-1 gap-6 md:grid-cols-[1.08fr_.92fr] md:gap-8">
        <div className="overflow-hidden rounded-3xl">
          <Image
            src={getImageProxyUrl(product.image)}
            alt={`Fotografia en primer plano de ${product.name}, una flor de la categoria ${product.fertilizerType || "flores ornamentales"}`}
            width={800}
            height={800}
            priority
            placeholder="blur"
            blurDataURL={PRODUCT_BLUR_DATA_URL}
            className="h-full w-full object-cover product-image-enhanced aspect-[4/3] md:aspect-[3/4]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-3 md:pt-2">
          <h1 className="text-5xl font-bold text-[#1e1e24]">{product.name}</h1>
          <p className="text-lg text-[#7b7b86]">{product.binomialName || product.description}</p>
          <p className="pt-2 text-4xl font-bold text-[#1e1e24]">{formatCurrency(product.price)}</p>
          <ul className="list-disc space-y-1 pl-9 text-sm text-[#3c3c45]">
            <li>Regar {product.wateringsPerWeek ?? 1} vez por semana</li>
            <li>Fertilizar con {product.fertilizerType || "nutrientes basicos"}</li>
          </ul>
          <button
            type="button"
            className="mt-4 h-11 min-w-[180px] rounded-full bg-[#7b1848] px-6 text-sm font-bold text-white transition hover:bg-[#65123a] focus:outline-none focus:ring-2 focus:ring-[#dcb1c3]"
          >
            Añadir al carrito
          </button>
        </div>
      </article>
    </main>
  );
}

