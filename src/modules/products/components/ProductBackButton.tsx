"use client";

import { useRouter } from "next/navigation";

interface ProductBackButtonProps {
  className?: string;
}

export const ProductBackButton = ({ className = "" }: ProductBackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`inline-flex items-center justify-center rounded-full border border-[#7b1848] bg-white px-6 text-sm font-bold text-[#7b1848] transition hover:bg-[#f7eef3] focus:outline-none focus:ring-2 focus:ring-[#dcb1c3] ${className}`}
      aria-label="Volver a la pantalla anterior"
    >
      Volver
    </button>
  );
};

