import { site } from "@/lib/site";

type Props = {
  compact?: boolean;
  className?: string;
};

export function CallButtons({ compact = false, className = "" }: Props) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {site.phones.map((phone) => (
        <a
          key={phone.e164}
          href={phone.tel}
          className={`inline-flex items-center justify-center gap-2 rounded-full bg-grill-orange font-semibold text-white shadow-[0_8px_24px_rgba(242,92,5,0.35)] transition hover:-translate-y-0.5 hover:bg-[#ff6a14] ${
            compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"
          }`}
        >
          <PhoneIcon />
          {compact ? phone.display : phone.label}
        </a>
      ))}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M7.2 3.6h2.4l1.2 3.2-1.8 1.1a12.5 12.5 0 0 0 6.1 6.1l1.1-1.8 3.2 1.2v2.4c0 .9-.7 1.7-1.6 1.8C9.6 18.4 5 13.8 4 5.2c0-.9.8-1.6 1.8-1.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
