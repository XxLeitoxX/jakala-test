"use client";

import Image from "next/image";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="mx-auto w-full max-w-[520px]">
    <label className="sr-only" htmlFor="product-search">
      Buscar en nuestra tienda
    </label>
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center" aria-hidden="true">
        <Image src="/assets/icons/search.svg" alt="" width={14} height={14} />
      </span>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Busca en nuestra tienda"
        className="h-10 w-full rounded-md border border-slate-300 bg-[#FFF] pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#c76c8f] focus:ring-2 focus:ring-[#f4d7e3]"
      />
    </div>
  </div>
);

