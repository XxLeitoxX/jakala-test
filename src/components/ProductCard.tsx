import Image from "next/image";
import Link from "next/link";

import { Product } from "@/core/product";
import { formatCurrency } from "@/utils/formatCurrency";
import { getImageProxyUrl } from "@/utils/getImageProxyUrl";
import { PRODUCT_BLUR_DATA_URL } from "@/utils/imagePlaceholder";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export const ProductCard = ({ product, className = "", priority = false }: ProductCardProps) => {
  const productCategory = product.fertilizerType || "flores ornamentales";
  const productAlt = `Fotografia en primer plano de ${product.name}, una flor de la categoria ${productCategory}`;

  return (
    <article
      className={`w-full max-w-[384px] rounded-3xl bg-[#FFF] p-3 shadow-[0_2px_4px_rgba(0,0,0,0.08)] ${className}`}
    >
      <div className="px-1">
        <h2 className="line-clamp-1 text-[28px] font-bold leading-[1.1] text-[#1c1c22]">{product.name}</h2>
        <p className="mt-2 line-clamp-1 text-[16px] text-[#686873]">
          {product.binomialName || product.description}
        </p>
      </div>
      <div className="relative mt-4 w-full overflow-hidden rounded-2xl aspect-[4/3]">
        <Image
          src={getImageProxyUrl(product.image)}
          alt={productAlt}
          width={400}
          height={400}
          priority={priority}
          placeholder="blur"
          blurDataURL={PRODUCT_BLUR_DATA_URL}
          className="h-full w-full object-cover product-image-enhanced"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 384px"
        />
        {product.isNew ? (
          <span className="absolute right-2 top-2 rounded-full bg-[#B5E5CF] px-3 py-1 text-[14px] font-normal leading-[21px] tracking-[0px] uppercase text-[#206143] [font-family:var(--font-dm-sans)]">
            NUEVO
          </span>
        ) : null}
        <div className="absolute bottom-2 left-2 rounded-full bg-white px-3 py-1 text-[20px] font-bold leading-[30px] tracking-[0px] text-[#1d1d22] [font-family:var(--font-nunito)]">
          {formatCurrency(product.price)}
        </div>
        <div className="absolute bottom-2 right-2">
          <Link
            href={`/product/${product.id}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:bg-[#f3e3ea] focus:outline-none focus:ring-2 focus:ring-[#f4d7e3]"
            aria-label={`Ver detalle de ${product.name}`}
          >
            <Image src="/assets/icons/detail-arrow.svg" alt="" width={24} height={24} />
          </Link>
        </div>
      </div>
    </article>
  );
};

