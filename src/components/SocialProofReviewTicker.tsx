import type { Review } from "@/db/schema";

export function SocialProofReviewTicker({ reviews }: { reviews: Review[] }) {
  const loop = [...reviews, ...reviews];

  return (
    <section className="overflow-hidden border-y border-grill-sand bg-white py-10">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-grill-orange">Bukoto talks with its mouth full</p>
        <h2 className="mt-2 font-display text-4xl text-grill-ink">What guests say</h2>
      </div>
      <div className="mt-6 overflow-hidden">
        <div className="marquee-track flex w-max gap-4 px-4">
          {loop.map((review, index) => (
            <blockquote
              key={`${review.id}-${index}`}
              className="w-[86vw] max-w-md shrink-0 rounded-3xl border border-grill-sand bg-grill-cream p-5 sm:w-[420px]"
            >
              <p className="text-sm leading-6 text-grill-forest">&ldquo;{review.quote}&rdquo;</p>
              <footer className="mt-3 text-xs font-semibold uppercase tracking-wide text-grill-orange">
                {review.author} · {review.source} · {"★".repeat(review.rating)}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
      <div className="sr-only">
        {reviews.map((review) => (
          <p key={review.id}>
            {review.author}: {review.quote}
          </p>
        ))}
      </div>
    </section>
  );
}
