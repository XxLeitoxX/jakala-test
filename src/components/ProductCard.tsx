import Image from "next/image";
import Link from "next/link";

import { Product } from "@/core/product";
import { formatCurrency } from "@/utils/formatCurrency";
import { getImageProxyUrl } from "@/utils/getImageProxyUrl";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => (
  <article className="w-full max-w-[384px] rounded-3xl bg-[#FFF] p-3 shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
    <div className="px-1">
      <h2 className="line-clamp-1 text-[28px] font-bold leading-[1.1] text-[#1c1c22]">{product.name}</h2>
      <p className="mt-2 line-clamp-1 text-[16px] text-[#686873]">{product.binomialName || product.description}</p>
    </div>
    <div className="relative mt-4 h-[300px] w-full overflow-hidden rounded-2xl">
      <Image
        src={getImageProxyUrl(product.image)}
        alt={product.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
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

