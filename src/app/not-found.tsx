import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-66px)] flex-col items-center justify-center bg-[#F9F9F9] px-6 text-center">
      <h1 className="text-[150px] font-bold leading-none text-black">404</h1>
      <p className="mt-3 text-xl font-bold text-black">Pagina no encontrada</p>
      <Link
        href="/"
        className="mt-4 text-base font-bold text-[#7b1848] underline-offset-2 transition hover:underline"
      >
        Ir al home
      </Link>
    </main>
  );
}

