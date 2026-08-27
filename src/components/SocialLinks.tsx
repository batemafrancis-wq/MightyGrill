import { site } from "@/lib/site";

const links = [
  { href: site.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.social.twitter, label: "X / Twitter", icon: XIcon },
  { href: site.social.tiktok, label: "TikTok", icon: TikTokIcon },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <nav aria-label="Social media" className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-grill-orange hover:bg-grill-orange"
        >
          <link.icon />
        </a>
      ))}
    </nav>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M14.7 10.4 21 3h-1.8l-5.5 6.4L9.3 3H3l6.7 9.7L3 21h1.8l6-6.9L14.7 21H21l-6.3-10.6Zm-2.1 2.5-.7-1-5.6-8h2.4l4.5 6.5.7 1 5.9 8.4h-2.4l-4.8-6.9Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M14.2 3c.4 2.6 1.8 4.3 4.3 4.6v2.6c-1.5 0-2.8-.5-4.2-1.4v6.6c0 3.4-2.6 5.8-6.1 5.8S2 18.8 2 15.4c0-3.3 2.6-5.8 6.2-5.8.5 0 1 .1 1.5.2v2.8c-.4-.2-.9-.3-1.5-.3-1.8 0-3.2 1.4-3.2 3.1s1.4 3.2 3.2 3.2 3.1-1.4 3.1-3.2V3h2.9Z" />
    </svg>
  );
}
