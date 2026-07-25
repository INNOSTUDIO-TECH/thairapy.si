import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-canvas flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
      <p className="font-display text-brass text-7xl italic">404</p>
      <h1 className="font-display text-ink mt-5 text-2xl">
        Stran ne obstaja · Seite nicht gefunden
      </h1>
      <p className="text-muted mt-3 max-w-md">
        Žal ta stran ni na voljo. · Diese Seite ist leider nicht verfügbar.
      </p>
      <Link
        href="/"
        className="bg-ink text-canvas hover:bg-brass hover:text-noir mt-8 rounded-full px-7 py-4 text-xs font-semibold tracking-[0.14em] uppercase transition-colors"
      >
        Domov · Startseite
      </Link>
    </div>
  );
}
