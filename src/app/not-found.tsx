import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-xl px-4 py-40 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-grill-orange">404</p>
      <h1 className="mt-3 font-display text-5xl">That plate left the pass</h1>
      <p className="mt-3 text-sm text-grill-forest/80">The page you want is not on tonight’s board.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-grill-green px-5 py-3 text-sm font-bold text-white">
        Back to The Mighty Grill
      </Link>
    </main>
  );
}
